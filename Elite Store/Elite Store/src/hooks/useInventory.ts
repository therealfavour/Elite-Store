import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Product } from '../components/ProductCard';

interface InventoryItem {
  productId: string;
  stock: number;
  reserved: number;
}

export function useInventory() {
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>('inventory', []);

  const initializeInventory = (products: Product[]) => {
    const existingIds = inventory.map(item => item.productId);
    const newItems = products
      .filter(product => !existingIds.includes(product.id))
      .map(product => ({
        productId: product.id,
        stock: Math.floor(Math.random() * 50) + 10, // Random stock 10-60
        reserved: 0
      }));
    
    if (newItems.length > 0) {
      setInventory(prev => [...prev, ...newItems]);
    }
  };

  const getStock = (productId: string): number => {
    const item = inventory.find(item => item.productId === productId);
    return item ? Math.max(0, item.stock - item.reserved) : 0;
  };

  const reserveStock = (productId: string, quantity: number): boolean => {
    const availableStock = getStock(productId);
    if (availableStock >= quantity) {
      setInventory(prev => prev.map(item => 
        item.productId === productId 
          ? { ...item, reserved: item.reserved + quantity }
          : item
      ));
      return true;
    }
    return false;
  };

  const releaseStock = (productId: string, quantity: number) => {
    setInventory(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, reserved: Math.max(0, item.reserved - quantity) }
        : item
    ));
  };

  const confirmPurchase = (productId: string, quantity: number) => {
    setInventory(prev => prev.map(item => 
      item.productId === productId 
        ? { 
            ...item, 
            stock: Math.max(0, item.stock - quantity),
            reserved: Math.max(0, item.reserved - quantity)
          }
        : item
    ));
  };

  return {
    inventory,
    initializeInventory,
    getStock,
    reserveStock,
    releaseStock,
    confirmPurchase
  };
}