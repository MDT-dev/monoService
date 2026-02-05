'use client';

import { useProducts } from '@/hooks/useProducts';
import Image from 'next/image';

export default function ProductList() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produtos</p>;

  return (
    <ul>
      {data?.products.map((product) => (
        <li key={product.id}>
          <Image src={product.thumbnail.url} width={150} height={200} alt={product.name}/>
          <h3>{product.name}</h3>
          <p>{product.price} Kz</p>
        </li>
      ))}
    </ul>
  );
}
