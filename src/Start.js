import { View, Text, StyleSheet, Touchable, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { LinearTransition, FadeIn, FadeOut, FadeInUp } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function Start({navigation, routes}) {
    const [animation, setAnimation] = useState(false);
    const [bgColor, setBgColor] = useState('#f8f8f8');
    const [notiTop, setNotiTop] = useState(false);
    const [notiBottom, setNotiBottom] = useState(false);
    const [notiLeft, setNotiLeft] = useState(false);
    const [notiRight, setNotiRight] = useState(false);

    const toggle = () => {
        setAnimation(prevState => !prevState);
    }

    const buttonPress = (color) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setBgColor(color);
    }

    const toggleNoti = (toggleFunction) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        toggleFunction(prevState => !prevState);
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: bgColor,
                    transitionProperty: ['backgroundColor'],
                    transitionDuration: animation ? 200 : 0
                }
            ]}
        >
            <Text style={styles.title}>Reanimated</Text>

            <View style={styles.toggleContainer}>
                <Text style={styles.subtitle}>Toggle Animations</Text>
                <Switch value={animation} onValueChange={toggle}/>
            </View>

            <View style={styles.buttonContainer}>
                <Text>Background Color</Text>
                <TouchableOpacity style={styles.button} onPress={() => buttonPress('#f8f8f8')}>
                    <Text>Default</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => buttonPress('#F19B57')}>
                    <Text>Orange</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => buttonPress('#8FA187')}>
                    <Text>Green</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.notificationContainer}>
                <Text>Open Notification</Text>
                <TouchableOpacity style={styles.button} onPress={() => toggleNoti(setNotiTop)}>
                    <Text>Top</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => toggleNoti(setNotiBottom)}>
                    <Text>Bottom</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => toggleNoti(setNotiLeft)}>
                    <Text>Left</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => toggleNoti(setNotiRight)}>
                    <Text>Right</Text>
                </TouchableOpacity>
            </View>

            <Animated.View 
                layout={animation ? LinearTransition.springify() : undefined}
                style={
                    {
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: notiTop ? "10%" : "-20%",
                        left: "50%",
                        right: "50%",
                        transitionDuration: animation ? 200 : 0
                    }
                }
            >
                {
                    <Animated.View style={styles.notification}>
                        <Text style={{color: 'white', fontWeight: 500}}>Sample Notification</Text>
                    </Animated.View>
                }
            </Animated.View>

            <Animated.View 
                layout={animation ? LinearTransition.springify() : undefined}
                style={
                    {
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: "50%",
                        right: "50%",
                        bottom: notiBottom ? "10%" : "-20%",
                        transitionDuration: animation ? 200 : 0
                    }
                }
            >
                {
                    <Animated.View style={styles.notification}>
                        <Text style={{color: 'white', fontWeight: 500}}>Sample Notification</Text>
                    </Animated.View>
                }
            </Animated.View>

            <Animated.View 
                layout={animation ? LinearTransition.springify() : undefined}
                style={
                    {
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: "55%",
                        left: notiLeft ? "10%" : "-100%",
                        transitionDuration: animation ? 100 : 0
                    }
                }
            >
                {
                    <Animated.View style={styles.notificationL}>
                        <Text style={{color: 'white', fontWeight: 500}}>Sample Notification</Text>
                    </Animated.View>
                }
            </Animated.View>

            <Animated.View 
                layout={animation ? LinearTransition.springify() : undefined}
                style={
                    {
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: "55%",
                        right: notiRight ? "10%" : "-100%",
                        transitionDuration: animation ? 100 : 0
                    }
                }
            >
                {
                    <Animated.View style={styles.notificationL}>
                        <Text style={{color: 'white', fontWeight: 500}}>Sample Notification</Text>
                    </Animated.View>
                }
            </Animated.View>
            
            <TouchableOpacity style={[styles.button, {marginTop: 32}]} onPress={() => navigation.navigate("List")}>
                <Text>To List Screen</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,  
        paddingVertical: 72,
        paddingHorizontal: 32
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 24
    },
    title: {
        fontWeight: '600',
        fontSize: 48
    },
    subtitle: {
        fontSize: 16
    },
    buttonContainer: {
        marginVertical: 32,
        gap: 12
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        padding: 12,
        backgroundColor: 'lightgray',
        borderColor: 'gray'
    },
    notificationContainer: {
        marginTop: 24,
        gap: 12
    },
    notification: {
        backgroundColor: '#1A1A1E',
        padding: 16,
        width: 200,
        borderRadius: 16,
        alignItems: 'center'
    },
    notificationL: {
        backgroundColor: '#1A1A1E',
        padding: 16,
        width: 100,
        borderRadius: 16,
        alignItems: 'center'
    }
});