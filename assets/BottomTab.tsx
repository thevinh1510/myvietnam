// system imports
import React, { Component, useEffect, useRef } from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Animated, Platform, Text, TouchableOpacity, View } from 'react-native';

// style import
import styles, { vw, vh, vmax, vmin } from './stylesheet';

// screen import
import Home from '../screens/Home';
import Podcast from '../screens/Podcast';
import Explore from '../screens/Explore';
import User from '../screens/User';

import * as SVG from './svgXml';
import * as STORAGEFNC from '../data/storageFunc'
import { SvgXml } from 'react-native-svg';
import * as CLASS from './Class';
import clrStyle, { NGHIASTYLE } from './componentStyleSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as CUSTOMCACHE from '../data/store';
import { UserFormat } from '../data/interfaceFormat';

const VH_VW = vw(100) > vh(100) ? true : false
const BOTTOM_TAB_ICON_SIZE = VH_VW ? vh(6) : vw(6)
const BOTTOM_TAB_ICON_PADDING = VH_VW ? vh(2) : vw(2)
const BOTTOM_TAB_ICON_HEIGHT = VH_VW ? vh(14) : vw(14)
const BOTTOM_TAB_HEIGHT = VH_VW ? vh(16) : vw(16)
const COLORFOCUS = NGHIASTYLE.NghiaWarning800
const COLORNOTFOCUS = NGHIASTYLE.NghiaWarning500
const LABELTEXTCLASS = CLASS.Inter12Reg

// icon generator
const iconData: { page: any, icon: string, iconActive: string, title: string }[] = [
    {
        page: Home,
        icon: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5427 3.15016L10.5431 3.14985C11.6273 2.27904 13.3675 2.28414 14.468 3.16073C14.4681 3.16084 14.4682 3.16094 14.4684 3.16105L21.014 8.39756C21.0146 8.39802 21.0152 8.39849 21.0157 8.39895C21.393 8.70711 21.7196 9.18942 21.9304 9.74099C22.141 10.2922 22.2196 10.8699 22.1462 11.351L20.8873 18.8845C20.8872 18.885 20.8872 18.8855 20.8871 18.8859C20.6374 20.3188 19.2432 21.5 17.8 21.5H7.19996C5.73549 21.5 4.3725 20.3476 4.12294 18.8965C4.12288 18.8961 4.12282 18.8958 4.12276 18.8955L2.86313 11.3576L2.86293 11.3565C2.78079 10.8718 2.85452 10.293 3.06465 9.74192C3.27476 9.19094 3.60548 8.70909 3.9918 8.40086L3.99267 8.40016L10.5427 3.15016ZM12.5 19.25C13.1861 19.25 13.75 18.6862 13.75 18V15C13.75 14.3139 13.1861 13.75 12.5 13.75C11.8138 13.75 11.25 14.3139 11.25 15V18C11.25 18.6862 11.8138 19.25 12.5 19.25Z" fill="#93370D" stroke="#93370D"/></svg>`,
        iconActive: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 18V15" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.57 2.81997L3.64002 8.36997C2.86002 8.98997 2.36002 10.3 2.53002 11.28L3.86002 19.24C4.10002 20.66 5.46002 21.81 6.90002 21.81H18.1C19.53 21.81 20.9 20.65 21.14 19.24L22.47 11.28C22.63 10.3 22.13 8.98997 21.36 8.36997L14.43 2.82997C13.36 1.96997 11.63 1.96997 10.57 2.81997Z" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        title: 'Trang chủ'
    },
    {
        page: Podcast,
        icon: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8295 8.11671L12.8293 8.11661C11.946 7.60842 10.8948 7.60668 10.018 8.11811C9.14451 8.62767 8.61997 9.54207 8.61997 10.55V13.9C8.61997 14.9191 9.14556 15.8229 10.018 16.3319C10.4568 16.5878 10.9341 16.71 11.42 16.71C11.8943 16.71 12.3813 16.5886 12.8207 16.3326C12.8211 16.3324 12.8215 16.3321 12.8219 16.3319L15.7193 14.6634C16.6055 14.1535 17.13 13.2376 17.13 12.22C17.13 11.2009 16.6044 10.2971 15.7319 9.7881L15.7295 9.78671L12.8295 8.11671ZM2.96997 12C2.96997 6.75614 7.22611 2.5 12.47 2.5C17.7235 2.5 21.97 6.75582 21.97 12C21.97 17.2439 17.7138 21.5 12.47 21.5C7.22611 21.5 2.96997 17.2439 2.96997 12Z" fill="#93370D" stroke="#93370D"/></svg>`,
        iconActive: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.47 22C17.9928 22 22.47 17.5228 22.47 12C22.47 6.47715 17.9928 2 12.47 2C6.94712 2 2.46997 6.47715 2.46997 12C2.46997 17.5228 6.94712 22 12.47 22Z" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.23999 12.2299V10.5599C9.23999 8.47988 10.71 7.62988 12.51 8.66988L13.96 9.50988L15.41 10.3499C17.21 11.3899 17.21 13.0899 15.41 14.1299L13.96 14.9699L12.51 15.8099C10.71 16.8499 9.23999 15.9999 9.23999 13.9199V12.2299Z" stroke="#F79009" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        title: 'Podcast'
    },
    {
        page: Explore,
        icon: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.1264 3.37354L21.1285 3.37557C21.8716 4.11019 22.1622 5.1581 21.9051 6.17776L21.9049 6.17883L19.4549 15.9888L19.4547 15.9894C19.0897 17.4586 17.9507 18.5894 16.4887 18.9549L6.67883 21.4049L6.67069 21.4069L6.66262 21.4092C6.4376 21.4735 6.19563 21.5 5.94998 21.5C5.18522 21.5 4.44092 21.1945 3.87226 20.6352C3.12733 19.8894 2.83809 18.8405 3.09481 17.8222L3.09508 17.8211L5.54505 8.01125C5.54506 8.01121 5.54507 8.01117 5.54508 8.01113C5.9106 6.54922 7.04141 5.41029 8.51056 5.04523L8.51125 5.04505L18.3113 2.59505L18.3122 2.59481C19.3311 2.33794 20.3805 2.62766 21.1264 3.37354ZM8.11998 12C8.11998 14.4161 10.0838 16.38 12.5 16.38C14.9161 16.38 16.88 14.4161 16.88 12C16.88 9.58384 14.9161 7.61998 12.5 7.61998C10.0838 7.61998 8.11998 9.58384 8.11998 12Z" fill="#93370D" stroke="#93370D"/></svg>`,
        iconActive: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3001 2.1L8.37009 4.59C6.92009 4.95 5.45009 6.42 5.09009 7.87L2.60009 17.8C1.85009 20.8 3.69009 22.65 6.70009 21.9L16.6301 19.42C18.0701 19.06 19.5501 17.58 19.9101 16.14L22.4001 6.2C23.1501 3.2 21.3001 1.35 18.3001 2.1Z" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 15.5C14.433 15.5 16 13.933 16 12C16 10.067 14.433 8.5 12.5 8.5C10.567 8.5 9 10.067 9 12C9 13.933 10.567 15.5 12.5 15.5Z" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        title: 'Khám phá'
    },
    {
        page: User,
        icon: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 6.75C8.25 4.40614 10.1561 2.5 12.5 2.5C14.8435 2.5 16.7495 4.40562 16.75 6.74903C16.7405 9.04858 14.9468 10.9052 12.661 10.99H12.661H12.6609H12.6609H12.6609H12.6609H12.6608H12.6608H12.6608H12.6607H12.6607H12.6607H12.6606H12.6606H12.6606H12.6606H12.6605H12.6605H12.6605H12.6604H12.6604H12.6604H12.6604H12.6603H12.6603H12.6603H12.6602H12.6602H12.6602H12.6601H12.6601H12.6601H12.6601H12.66H12.66H12.66H12.6599H12.6599H12.6599H12.6599H12.6598H12.6598H12.6598H12.6597H12.6597H12.6597H12.6596H12.6596H12.6596H12.6596H12.6595H12.6595H12.6595H12.6594H12.6594H12.6594H12.6594H12.6593H12.6593H12.6593H12.6592H12.6592H12.6592H12.6591H12.6591H12.6591H12.6591H12.659H12.659H12.659H12.6589H12.6589H12.6589H12.6588H12.6588H12.6588H12.6588H12.6587H12.6587H12.6587H12.6586H12.6586H12.6586H12.6585H12.6585H12.6585H12.6585H12.6584H12.6584H12.6584H12.6583H12.6583H12.6583H12.6582H12.6582H12.6582H12.6581H12.6581H12.6581H12.6581H12.658H12.658H12.658H12.6579H12.6579H12.6579H12.6578H12.6578H12.6578H12.6577H12.6577H12.6577H12.6576H12.6576H12.6576H12.6575H12.6575H12.6575H12.6575H12.6574H12.6574H12.6574H12.6573H12.6573H12.6573H12.6572H12.6572H12.6572H12.6571H12.6571H12.6571H12.657H12.657H12.657H12.6569H12.6569H12.6569H12.6568H12.6568H12.6568H12.6567H12.6567H12.6566H12.6566H12.6566H12.6565H12.6565H12.6565H12.6564H12.6564H12.6564H12.6563H12.6563H12.6563H12.6562H12.6562H12.6562H12.6561H12.6561H12.656H12.656H12.656H12.6559H12.6559H12.6559H12.6558H12.6558H12.6558H12.6557H12.6557H12.6556H12.6556H12.6556H12.6555H12.6555H12.6555H12.6554H12.6554H12.6553H12.6553H12.6553H12.6552H12.6552H12.6551H12.6551H12.6551H12.655H12.655H12.6549H12.6549H12.6549H12.6548H12.6548H12.6547H12.6547H12.6547H12.6546H12.6546H12.6545H12.6545H12.6545H12.6544H12.6544H12.6543H12.6543H12.6542H12.6542H12.6542H12.6541H12.6541H12.654H12.654H12.6539H12.6539H12.6539H12.6538H12.6538H12.6537H12.6537H12.6536H12.6536H12.6535H12.6535H12.6535H12.6534H12.6534H12.6533H12.6533H12.6532H12.6532H12.6531H12.6531H12.653H12.653H12.6529H12.6529H12.6529H12.6528H12.6528H12.6527H12.6527H12.6526H12.6526H12.6525H12.6525H12.6524H12.6524H12.6523H12.6523H12.6522H12.6522H12.6521H12.6521H12.652H12.652H12.6519H12.6519H12.6518H12.6518H12.6517H12.6517H12.6516H12.6516H12.6515H12.6514H12.6514H12.6513H12.6513H12.6512H12.6512H12.6511H12.6511H12.651H12.651H12.6509H12.6509H12.6508H12.6507H12.6507H12.6506H12.6506H12.6505H12.6505H12.6504H12.6503H12.6503H12.6502H12.6502H12.6501H12.6501H12.65H12.6499H12.6498H12.6496H12.6495H12.6494H12.6493H12.6492H12.6491H12.649H12.6488H12.6487H12.6486H12.6485H12.6484H12.6483H12.6482H12.648H12.6479H12.6478H12.6477H12.6476H12.6475H12.6474H12.6473H12.6471H12.647H12.6469H12.6468H12.6467H12.6466H12.6465H12.6464H12.6463H12.6461H12.646H12.6459H12.6458H12.6457H12.6456H12.6455H12.6454H12.6453H12.6452H12.6451H12.6449H12.6448H12.6447H12.6446H12.6445H12.6444H12.6443H12.6442H12.6441H12.644H12.6439H12.6438H12.6437H12.6436H12.6435H12.6433H12.6432H12.6431H12.643H12.6429H12.6428H12.6427H12.6426H12.6425H12.6424H12.6423H12.6422H12.6421H12.642H12.6419H12.6418H12.6417H12.6416H12.6415H12.6414H12.6413H12.6412H12.6411H12.641H12.6409H12.6408H12.6407H12.6406H12.6405H12.6404H12.6403H12.6402H12.6401H12.64H12.6399H12.6398H12.6397H12.6396H12.6395H12.6394H12.6393H12.6392H12.6391H12.639H12.6389H12.6388H12.6387H12.6386H12.6385H12.6384H12.6383H12.6382H12.6381H12.638H12.6379H12.6378H12.6377H12.6376H12.6375H12.6374H12.6373H12.6372H12.6371H12.637H12.6369H12.6368H12.6368H12.6367H12.6366H12.6365H12.6364H12.6363H12.6362H12.6361H12.636H12.6359H12.6358H12.6357H12.6356H12.6355H12.6354H12.6353H12.6352H12.6351H12.6351H12.635H12.6349H12.6348H12.6347H12.6346H12.6345H12.6344H12.6343H12.6342H12.6341H12.634H12.6339H12.6338H12.6338C12.5433 10.9796 12.4492 10.9808 12.3625 10.989C10.0254 10.8911 8.25 9.03575 8.25 6.75Z" fill="#93370D" stroke="#93370D"/><path d="M7.69868 20.1749L7.69731 20.174C6.53836 19.4013 5.95996 18.4018 5.95996 17.38C5.95996 16.3579 6.53872 15.3485 7.707 14.5662C9.01356 13.7018 10.7518 13.255 12.5125 13.255C14.2738 13.255 16.0067 13.7021 17.3026 14.566C18.458 15.3363 19.0309 16.3356 19.04 17.3621C19.0392 18.3935 18.4603 19.3928 17.3008 20.1752C16 21.0484 14.2627 21.5 12.5 21.5C10.737 21.5 8.99957 21.0483 7.69868 20.1749Z" fill="#93370D" stroke="#93370D"/></svg>`,
        iconActive: `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6601 10.87C12.5601 10.86 12.4401 10.86 12.3301 10.87C9.95006 10.79 8.06006 8.84 8.06006 6.44C8.06006 3.99 10.0401 2 12.5001 2C14.9501 2 16.9401 3.99 16.9401 6.44C16.9301 8.84 15.0401 10.79 12.6601 10.87Z" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.65997 14.56C5.23997 16.18 5.23997 18.82 7.65997 20.43C10.41 22.27 14.92 22.27 17.67 20.43C20.09 18.81 20.09 16.17 17.67 14.56C14.93 12.73 10.42 12.73 7.65997 14.56Z" stroke="#F79009" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        title: 'Tài khoản'
    },
]

class RenderLabel extends Component<{ focused: boolean, title: string }, {}> {
    render(): React.ReactNode {
        return (
            <LABELTEXTCLASS style={{ color: this.props.focused ? COLORFOCUS : COLORNOTFOCUS }}>{this.props.title}</LABELTEXTCLASS>
        );
    }
}

// // ____________________END OF IMPORT_______________________

const BottomTab = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const Tab = createBottomTabNavigator();
    const [CurrentCache, dispatch] = React.useContext(CUSTOMCACHE.RootContext);

    useEffect(() => {
        const fetchUser = async () => {
            let user: UserFormat | false = await STORAGEFNC.getUser();
            if (user && user.name) {
                dispatch(CUSTOMCACHE.currentSetUser(user));
            } else {
                navigation.navigate('Onboard' as never);
            }
        };
        fetchUser();
    }, []);

    return (
        <Tab.Navigator
            tabBar={props => <BottomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: BOTTOM_TAB_HEIGHT + insets.bottom,
                    // display: 'flex',
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // alignItems: 'center',
                    // paddingHorizontal: vw(4),
                    paddingVertical: Platform.OS === 'android' ? null : vh(1),
                    paddingBottom: insets.bottom,
                },
            }}
        >
            <Tab.Screen name={iconData[0].title} component={iconData[0].page}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml xml={focused ? iconData[0].icon : iconData[0].iconActive} width={BOTTOM_TAB_ICON_SIZE} height={BOTTOM_TAB_ICON_SIZE} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <RenderLabel focused={focused} title={iconData[0].title} />
                    ),
                }} />
            <Tab.Screen name={iconData[1].title} component={iconData[1].page}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml xml={focused ? iconData[1].icon : iconData[1].iconActive} width={BOTTOM_TAB_ICON_SIZE} height={BOTTOM_TAB_ICON_SIZE} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <RenderLabel focused={focused} title={iconData[1].title} />
                    ),
                }} />
            <Tab.Screen name={iconData[2].title} component={iconData[2].page}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml xml={focused ? iconData[2].icon : iconData[2].iconActive} width={BOTTOM_TAB_ICON_SIZE} height={BOTTOM_TAB_ICON_SIZE} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <RenderLabel focused={focused} title={iconData[2].title} />
                    ),
                }} />
            <Tab.Screen name={iconData[3].title} component={iconData[3].page}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml xml={focused ? iconData[3].icon : iconData[3].iconActive} width={BOTTOM_TAB_ICON_SIZE} height={BOTTOM_TAB_ICON_SIZE} />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <RenderLabel focused={focused} title={iconData[3].title} />
                    ),
                }} />
        </Tab.Navigator>
    );
};

export default BottomTab;