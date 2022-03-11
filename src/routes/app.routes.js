import React from 'react';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Service from '../pages/Service';
import Contact  from '../pages/Contact';
import Cart from '../pages/Cart';
import Rating from '../pages/Rating';
import History from '../pages/History';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DetailService from '../pages/DetailService';
import {useCart} from '../contexts/cart';

const Tab = createBottomTabNavigator();
const ServiceStack = createStackNavigator();
const PageServiceStack = createStackNavigator();
const CartStack = createStackNavigator();

const ServiceStackScreen = () => {
    return (
        <ServiceStack.Navigator screenOptions={{headerShown: false}}>
            <ServiceStack.Screen name="Home" component={Home} />
            <ServiceStack.Screen name="DetailService" component={DetailService} />
        </ServiceStack.Navigator>
    )
};


const PageServiceStackScreen = () => {
    return (
        <PageServiceStack.Navigator screenOptions={{headerShown: false}}>
            <PageServiceStack.Screen name="Serviços" component={Service} />
            <PageServiceStack.Screen name="DetailService" component={DetailService} />
        </PageServiceStack.Navigator>
    )
};

const CartStackScreen = () => {
    return (
        <CartStack.Navigator screenOptions={{headerShown: false}}>
            <CartStack.Screen name="Carrinho" component={Cart} />
            <CartStack.Screen name="Avaliação" component={Rating} />
            <CartStack.Screen name="Historico" component={History} />
        </CartStack.Navigator>
    )
}



const AppRoutes = () => {
    const {lengthItens} = useCart();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'MagiaDoBrincar') {
                    iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Serviços') {
                    iconName = focused ? 'list' : 'list-outline';
                }

                else if (route.name === 'Carrinho') {
                    iconName = focused ? 'calendar' : 'calendar-outline';
                }

                else if (route.name === 'Contato') {
                    iconName = focused ? 'pin' : 'pin-outline';
                }

                else if (route.name === 'Perfil') {
                    iconName = focused ? 'people' : 'people-outline';
                } 


                return <Ionicons name={iconName} size={size} color={color} />;
                
                },
                tabBarActiveTintColor: '#cd92ca',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name="MagiaDoBrincar" component={ServiceStackScreen} />
            <Tab.Screen name="Carrinho" component={CartStackScreen} options={{tabBarBadge: lengthItens}} />
            <Tab.Screen name="Serviços" component={PageServiceStackScreen} />
            {/* <Tab.Screen name="Contato" component={Contact} /> */}
            <Tab.Screen name="Perfil" component={Profile} />
        </Tab.Navigator>

    )
};



export default AppRoutes;