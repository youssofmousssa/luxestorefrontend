import { useEffect, useState } from 'react';
import apiFetch from '@/lib/api';

export interface Order {
  id: number;
  user_id: number;
  items: any[];
  total: number;
  payment_intent_id?: string;
  shipping_address?: any;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch('/orders')
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.error || 'Failed to fetch orders'))
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
}

export function useOrder(id: number) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/orders/${id}`)
      .then((data) => setOrder(data.order))
      .catch((err) => setError(err.error || 'Failed to fetch order'))
      .finally(() => setLoading(false));
  }, [id]);

  return { order, loading, error };
}
