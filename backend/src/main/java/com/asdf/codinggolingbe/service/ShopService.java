package com.asdf.codinggolingbe.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asdf.codinggolingbe.common.CustomException;
import com.asdf.codinggolingbe.common.ErrorCode;
import com.asdf.codinggolingbe.domain.ShopItem;
import com.asdf.codinggolingbe.domain.UserInventory;
import com.asdf.codinggolingbe.domain.UserProgress;
import com.asdf.codinggolingbe.dto.PurchaseRequest;
import com.asdf.codinggolingbe.dto.PurchaseResponse;
import com.asdf.codinggolingbe.dto.ShopItemResponse;
import com.asdf.codinggolingbe.repository.ShopItemRepository;
import com.asdf.codinggolingbe.repository.UserInventoryRepository;
import com.asdf.codinggolingbe.repository.UserProgressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopItemRepository shopItemRepository;
    private final UserInventoryRepository userInventoryRepository;
    private final UserProgressRepository userProgressRepository;
    private final ProgressService progressService;

    @Transactional(readOnly = true)
    public List<ShopItemResponse> getItems(Long userId) {
        Set<String> owned = ownedItemIds(userId);
        return shopItemRepository.findAll().stream()
                .map(item -> ShopItemResponse.of(item, owned.contains(item.getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ShopItemResponse> getInventory(Long userId) {
        Set<String> owned = ownedItemIds(userId);
        return shopItemRepository.findAllById(owned).stream()
                .map(item -> ShopItemResponse.of(item, true))
                .toList();
    }

    /**
     * 구매 — 젬 잔액 검증 → 차감 → 인벤토리 기록을 한 트랜잭션으로.
     * 젬이 부족하면 아무것도 바꾸지 않고 400 으로 끝난다 (클라이언트 값은 믿지 않는다).
     */
    @Transactional
    public PurchaseResponse purchase(Long userId, PurchaseRequest request) {
        ShopItem item = shopItemRepository.findById(request.itemId())
                .orElseThrow(() -> new CustomException(ErrorCode.SHOP_ITEM_NOT_FOUND));

        UserProgress progress = userProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (progress.getGems() < item.getCostGems()) {
            throw new CustomException(ErrorCode.NOT_ENOUGH_GEMS);
        }

        progress.spendGems(item.getCostGems());
        userInventoryRepository.save(UserInventory.of(userId, item.getId()));

        // 특수 action: 에너지 최대치로 충전 (changeEnergy 가 상한에서 clamp)
        if (item.isRefill()) {
            progress.changeEnergy(UserProgress.MAX_ENERGY);
        }

        return new PurchaseResponse(item.getId(), progressService.getProgress(userId));
    }

    private Set<String> ownedItemIds(Long userId) {
        return userInventoryRepository.findByUserId(userId).stream()
                .map(UserInventory::getShopItemId)
                .collect(Collectors.toSet());
    }
}
