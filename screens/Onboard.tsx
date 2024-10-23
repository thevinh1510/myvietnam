import { View, Text, TouchableOpacity, Image, ImageStyle, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import styles, { vw } from '../assets/stylesheet'
import * as Class from '../assets/Class'
import { statusBarTransparency } from '../assets/component'
import { useNavigation } from '@react-navigation/native'
import { NGHIASTYLE } from '../assets/componentStyleSheet'

export default function Onboard() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[styles.flex1]}>
            {statusBarTransparency(false, true)}
            <View style={[styles.flex1, styles.w100vw, styles.flexColCenter]}>
                <Image source={require('../assets/photos/onboard.png')} style={[styles.w80vw, styles.h50vh, { resizeMode: 'contain' }] as ImageStyle} />
            </View>
            <Class.LowBtn title='Get Started'
                onPress={() => { navigation.navigate('DataCollect' as never) }}
                CustomStyle={[styles.marginBottom8vw]}
                bgColor={NGHIASTYLE.NghiaError800 as string}
                FontElement={Class.Inter20Bold}
            />
        </SafeAreaView>
    )
}