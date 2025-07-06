import { useEffect, useState } from 'react';
import apiFetch from '@/lib/api';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  stock?: number;
  category?: string;
  variants?: any;
  created_at?: string;
  updated_at?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch('/products')
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.error || 'Failed to fetch products'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/products/${id}`)
      .then((data) => setProduct(data.product))
      .catch((err) => setError(err.error || 'Failed to fetch product'))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
