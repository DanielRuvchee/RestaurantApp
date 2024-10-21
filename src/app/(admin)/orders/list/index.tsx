import { Text, FlatList, ActivityIndicator } from 'react-native'

import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrderList } from '@/src/app/api/orders'
import { useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/src/app/api/orders/subscriptions';

export default function OrdersScreen() {
    const { 
        data: orders,
        isLoading,
        error,
         } = useAdminOrderList({ archived: false });

         useInsertOrderSubscription();

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch</Text>
    }

    return (
        <FlatList data={orders} renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }} />

    )
}
