import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions, Easing,
    StyleSheet,
    View
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get('window');

interface SwipeButtonProps {
    onSwipeSuccess: () => void;
    title: string;
    disabled: boolean;
    isCheckedIn: boolean;
}

export default function CustomSwipeButton({ onSwipeSuccess, title, disabled, isCheckedIn }: SwipeButtonProps) {
    const gestureX = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(isCheckedIn ? screenWidth * 0.9 - 50 - 8 : 0)).current;
    const [buttonWidth, setButtonWidth] = useState(screenWidth * 0.9);
    const [isDragging, setIsDragging] = useState(false);
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const rotationAnim = useRef(new Animated.Value(isCheckedIn ? 1 : 0)).current;

    const THUMB_SIZE = 50;
    const RAIL_HEIGHT = 60;
    const maxTranslateX = buttonWidth - THUMB_SIZE - 8;
    const successThreshold = maxTranslateX * 0.7;

    useEffect(() => {
        gestureX.addListener(({ value }) => {
            const clampedValue = isCheckedIn
                ? Math.max(0, Math.min(maxTranslateX, maxTranslateX + value))
                : Math.max(0, Math.min(maxTranslateX, value));
            translateX.setValue(clampedValue);
        });
        return () => gestureX.removeAllListeners();
    }, [isCheckedIn, maxTranslateX]);

    useEffect(() => {
        translateX.setValue(isCheckedIn ? maxTranslateX : 0);
        Animated.timing(rotationAnim, {
            toValue: isCheckedIn ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isCheckedIn, maxTranslateX]);

    const gradientColors = isCheckedIn
        ? ['#FF7A7A', '#FF5E5E', '#FF3D3D']
        : ['#A2D56F', '#7BC043', '#5DAA2F'];

    const thumbGradientColors = isCheckedIn
        ? ['#FFF0F0', '#FFE0E0']
        : ['#F0FAEC', '#E4F5DB'];

    const backgroundGradientColors = ['#FFFFFF', '#F3F4F6'];

    const progressBackgroundColors = isCheckedIn
        ? ['rgb(254, 139, 129)', 'rgb(254, 139, 129)']
        : ['rgb(137, 172, 70)', 'rgb(137, 172, 70)'];

    const iconColor = isDragging
        ? (isCheckedIn ? '#FF6B6B' : '#89AC46')
        : '#000000';

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: gestureX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.BEGAN) {
            setIsDragging(true);
        } else if (event.nativeEvent.state === State.END) {
            setIsDragging(false);
            const { translationX } = event.nativeEvent;

            const isSwipeRight = !isCheckedIn && translationX >= successThreshold;
            const isSwipeLeft = isCheckedIn && translationX <= -successThreshold;

            if (isSwipeRight || isSwipeLeft) {
                Animated.timing(translateX, {
                    toValue: isSwipeRight ? maxTranslateX : 0,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }).start(() => {
                    onSwipeSuccess();
                });
            } else {
                Animated.spring(translateX, {
                    toValue: isCheckedIn ? maxTranslateX : 0,
                    useNativeDriver: true,
                }).start();
            }

            gestureX.setValue(0);
        }
    };

    const textOpacity = translateX.interpolate({
        inputRange: [0, maxTranslateX * 0.3, maxTranslateX * 0.7, maxTranslateX],
        outputRange: [1, 0.5, 0.5, 1],
        extrapolate: 'clamp',
    });

    const arrowRotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const titleText = isCheckedIn ? 'Swipe Left to Check Out' : 'Swipe Right to Check In';

    return (
        <GestureHandlerRootView style={styles.swipeContainer}>
            <View
                style={[
                    styles.swipeRail,
                    {
                        width: buttonWidth,
                        height: RAIL_HEIGHT,
                    }
                ]}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setButtonWidth(width);
                }}
            >
                <LinearGradient
                    colors={backgroundGradientColors as any}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />

                <View style={[styles.progressContainer, { width: buttonWidth - 4 }]}>
                    <LinearGradient
                        colors={progressBackgroundColors as any}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                transform: [{
                                    scaleX: translateX.interpolate({
                                        inputRange: [0, maxTranslateX],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    })
                                }],
                                opacity: opacityAnim
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={gradientColors as any}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.progressOverlay} />
                        </LinearGradient>
                    </Animated.View>
                </View>

                <Animated.Text
                    style={[
                        styles.swipeText,
                        {
                            opacity: textOpacity,
                            color: '#ffffff',
                            
                        }
                    ]}
                >
                    {titleText}
                </Animated.Text>

                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                    enabled={!disabled}
                >
                    <Animated.View
                        style={[
                            styles.swipeThumb,
                            {
                                width: THUMB_SIZE,
                                height: THUMB_SIZE,
                                transform: [{ translateX }],
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={thumbGradientColors as any}
                            style={[StyleSheet.absoluteFill, styles.thumbGradient]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        />
                        <View style={styles.thumbInner}>
                            <Animated.View
                                style={{
                                    transform: [{ rotate: arrowRotation }],
                                }}
                            >
                                <ChevronRight
                                    size={24}
                                    color={iconColor}
                                    strokeWidth={2}
                                />
                            </Animated.View>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    swipeContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    swipeRail: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    progressContainer: {
        position: 'absolute',
        height: 56,
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    progressBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        transform: [{ scaleX: 0 }],
        transformOrigin: 'left',
    },
    progressOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    swipeText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        zIndex: 1,
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    swipeThumb: {
        position: 'absolute',
        left: 5,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 6,
        elevation: 4,
        zIndex: 2,
        overflow: 'hidden',
    },
    thumbGradient: {
        borderRadius: 12,
    },
    thumbInner: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    }
});
