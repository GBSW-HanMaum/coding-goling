package com.asdf.codinggolingbe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asdf.codinggolingbe.domain.ShopItem;

public interface ShopItemRepository extends JpaRepository<ShopItem, String> {
}
