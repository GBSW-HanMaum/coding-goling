package com.asdf.codinggolingbe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asdf.codinggolingbe.domain.UserInventory;

public interface UserInventoryRepository extends JpaRepository<UserInventory, Long> {

    List<UserInventory> findByUserId(Long userId);
}
