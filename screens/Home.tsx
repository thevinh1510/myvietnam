import { View, Text, ScrollView, TouchableOpacity, Image, ImageStyle } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as CLASS from '../assets/Class'
import * as CUSTOMCACHE from '../data/store';
import * as SVG from '../assets/svgXml'
import styles, { vw } from '../assets/stylesheet';
import { NGHIASTYLE } from '../assets/componentStyleSheet';
import { factoryData } from '../data/factoryData';
import * as FORMATDATA from '../data/interfaceFormat';

export default function Home() {
    const navigation = useNavigation();
    const [CurrentCache, dispatch] = useContext(CUSTOMCACHE.RootContext);

    class RenderTopPickToday extends React.Component<{ data: any[] }> {
        render() {
            if (this.props.data.length > 0) {
                return (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={[styles.paddingV4vw]}
                    >
                        {
                            this.props.data.map((item: FORMATDATA.BlogPostFormat, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('BlogView', { title: 'Hôm nay đọc gì', data: { ...item, uploadDate: item.uploadDate.toISOString(), } }) }}
                                        key={index + 'topPick'}
                                        style={[styles.flexRowBetweenCenter, styles.w80vw, styles.h100, styles.borderRadius2vw, styles.shadowW0H2Black, { backgroundColor: NGHIASTYLE.NghiaWarning50 as string, marginLeft: index == 0 ? vw(4) : 0, marginRight: vw(4) }]}>
                                        <CLASS.ViewColStartBetween style={[styles.flex1, styles.h100, styles.padding3vw]}>
                                            <CLASS.ViewCol style={[styles.gap1vw]}>
                                                <CLASS.Inter14Bold style={{ color: NGHIASTYLE.NghiaWarning800 }}>{item.character}</CLASS.Inter14Bold>
                                                <CLASS.Inter16Bold style={{ color: NGHIASTYLE.NghiaGray800, lineHeight: vw(6) }}>{item.title}</CLASS.Inter16Bold>
                                                <CLASS.ViewRowStartCenter style={[styles.colGap4vw, styles.w100, styles.flexWrap]}>
                                                    <CLASS.ViewRowCenter>
                                                        {SVG.calendar(vw(6), vw(6))}
                                                        <CLASS.Inter12Reg style={{ color: NGHIASTYLE.NghiaGray400 }}> {item.uploadDate.getDate()} th{item.uploadDate.getMonth() + 1}</CLASS.Inter12Reg>
                                                    </CLASS.ViewRowCenter>
                                                    <CLASS.ViewRowCenter>
                                                        {SVG.clock(vw(6), vw(6))}
                                                        <CLASS.Inter12Reg style={{ color: NGHIASTYLE.NghiaGray400 }}> {item.readTime} đọc</CLASS.Inter12Reg>
                                                    </CLASS.ViewRowCenter>
                                                </CLASS.ViewRowStartCenter>
                                            </CLASS.ViewCol>
                                            <CLASS.ViewRowStartCenter>
                                                {SVG.eye(vw(6), vw(6))}
                                                <CLASS.Inter12Reg style={{ color: NGHIASTYLE.NghiaGray400 }}> {item.view ? item.view : 0} lượt xem</CLASS.Inter12Reg>
                                            </CLASS.ViewRowStartCenter>
                                        </CLASS.ViewColStartBetween>
                                        <Image
                                            source={{ uri: item.imgAddress }}
                                            style={[{ width: vw(30), height: vw(45), borderTopRightRadius: vw(2), borderBottomRightRadius: vw(2), overflow: 'hidden' }]}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                )
            } else {
                return (
                    <View>
                        <Text>Không có bài viết nào</Text>
                    </View>
                )
            }
        }
    }

    class RenderBlogList extends React.Component<{ data: any[] }> {
        render() {
            if (this.props.data.length > 0) {
                return (
                    <CLASS.ViewCol
                        style={[styles.gap2vw]}
                    >
                        {
                            this.props.data.map((item: FORMATDATA.BlogPostFormat, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('BlogView', { title: 'Bài viết nổi bật', data: { ...item, uploadDate: item.uploadDate.toISOString(), } }) }}
                                        key={index + 'blog'}
                                        style={[styles.flexRowBetweenCenter, styles.flex1, styles.borderRadius2vw, styles.marginHorizontal4vw, { backgroundColor: NGHIASTYLE.NghiaWarning50 as string, }]}>
                                        <CLASS.ViewColStartBetween style={[styles.flex1, styles.h30vw, styles.padding3vw]}>
                                            <CLASS.ViewRowStartCenter style={[styles.gap2vw]}>
                                                <Image source={{ uri: item.author?.imgAddress }} style={[{ width: vw(6), height: vw(6) }, styles.borderRadius100] as ImageStyle} />
                                                <CLASS.Inter14Bold style={{ color: NGHIASTYLE.NghiaWarning800 }}>{item.author?.name}</CLASS.Inter14Bold>
                                            </CLASS.ViewRowStartCenter>
                                            <CLASS.Inter16Bold style={{ color: NGHIASTYLE.NghiaGray800, lineHeight: vw(6) }}>{item.title}</CLASS.Inter16Bold>
                                            <CLASS.ViewRowStartCenter style={[styles.colGap4vw, styles.w100, styles.flexWrap]}>
                                                <CLASS.ViewRowCenter>
                                                    {SVG.calendar(vw(6), vw(6))}
                                                    <CLASS.Inter12Reg style={{ color: NGHIASTYLE.NghiaGray400 }}> {item.uploadDate.getDate()} th{item.uploadDate.getMonth() + 1}</CLASS.Inter12Reg>
                                                </CLASS.ViewRowCenter>
                                                <CLASS.ViewRowCenter>
                                                    {SVG.clock(vw(6), vw(6))}
                                                    <CLASS.Inter12Reg style={{ color: NGHIASTYLE.NghiaGray400 }}> {item.readTime} đọc</CLASS.Inter12Reg>
                                                </CLASS.ViewRowCenter>
                                            </CLASS.ViewRowStartCenter>
                                        </CLASS.ViewColStartBetween>
                                        <Image
                                            source={{ uri: item.imgAddress }}
                                            style={[{ width: vw(25), height: vw(32), borderTopRightRadius: vw(2), borderBottomRightRadius: vw(2), overflow: 'hidden' }]}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </CLASS.ViewCol>
                )
            } else {
                return (
                    <View>
                        <Text>Không có bài viết nào</Text>
                    </View>
                )
            }
        }
    }

    return (
        <CLASS.SSBarWithSaveArea bgColor={NGHIASTYLE.NghiaWarning25}>
            <CLASS.TopBarWithAvatarIMGand2RightIcon
                avatarIMG={CurrentCache.user.imgAddress}
                title='Trang chủ'
                rightIcon1={SVG.bellIcon(vw(6), vw(6))}
            />
            <ScrollView>
                <CLASS.SectionTitleAndRightArrow
                    title='Hôm nay đọc gì'
                    fnc={() => { }}
                    titleColor={NGHIASTYLE.NghiaGray800 as string}
                    arrowColor={NGHIASTYLE.NghiaGray400 as string}
                />
                <RenderTopPickToday data={factoryData.blogList} />
                <CLASS.SectionTitleAndRightArrow
                    title='Bài viết nổi bật'
                    fnc={() => { }}
                    titleColor={NGHIASTYLE.NghiaGray800 as string}
                    arrowColor={NGHIASTYLE.NghiaGray400 as string}
                />
                <RenderBlogList data={factoryData.blogList} />
            </ScrollView>
        </CLASS.SSBarWithSaveArea>
    )
}