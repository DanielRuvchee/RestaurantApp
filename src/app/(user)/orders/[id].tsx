
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useOrderDetails } from '../../api/orders';
import { useUpdateOrderSubscription } from '../../api/orders/subscriptions';

export default function OrderDetailsScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString == 'string' ? idString : idString[0]);

    const { data: order, isLoading, error } = useOrderDetails(id);
    useUpdateOrderSubscription(id);

    if(!order) {
        return <Text>Not Found</Text>
    }

    if(isLoading) {
        return <ActivityIndicator/>;
    }

    if(error) {
        return <Text>Failed to fetch</Text>
    }

    return (
        <View style={{padding: 10, gap: 20, flex: 1}}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            
           

            <FlatList data={order.order_items} renderItem={({item}) => <OrderItemListItem item={item} />}
                contentContainerStyle={{gap: 10}}
                ListHeaderComponent={() =>  <OrderListItem order={order} />}
            />
        </View>
    )
} 