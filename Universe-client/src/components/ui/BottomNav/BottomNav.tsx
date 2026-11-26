import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import { Href, usePathname, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect, Circle } from "react-native-svg";

interface IconProps {
  color: string;
}

const ACTIVE_COLOR = "#003C7D";
const ACTIVE_PILL_BG = "#D0E5FB";
const INACTIVE_COLOR = "#5F5A55";
const PILL_WIDTH = 58;
const PILL_HEIGHT = 36;

const HomeIcon = ({ color }: IconProps) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5L12 3L21 10.5V19.5C21 20.3284 20.3284 21 19.5 21H14.5V14.5H9.5V21H4.5C3.67157 21 3 20.3284 3 19.5V10.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ScheduleIcon = ({ color }: IconProps) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3.5}
      y={5}
      width={17}
      height={16}
      rx={2.5}
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M8 3V6.5M16 3V6.5M3.5 10H20.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const MapIcon = ({ color }: IconProps) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6.5L9 4L15 6.5L21 4V17.5L15 20L9 17.5L3 20V6.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 4V17.5M15 6.5V20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const PeopleIcon = ({ color }: IconProps) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Circle cx={9} cy={7.5} r={3.2} stroke={color} strokeWidth={2} />
    <Path
      d="M3 19.5V18.5C3 16.0147 5.01472 14 7.5 14H10.5C12.9853 14 15 16.0147 15 18.5V19.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M15.5 4.7C17.05 5.1 18.2 6.5 18.2 8.1C18.2 9.7 17.05 11.1 15.5 11.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M17.8 14.3C19.65 14.8 21 16.45 21 18.4V19.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const ShopIcon = ({ color }: IconProps) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6.5 4H17.5L20 8V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8L6.5 4Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M4 8H20" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path
      d="M15.5 11.5C15.5 13.433 13.933 15 12 15C10.067 15 8.5 13.433 8.5 11.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

interface TabItem {
  label: string;
  href: Href;
  matchPath: string;
  Icon: React.FC<IconProps>;
}

const TABS: TabItem[] = [
  {
    label: "Home",
    href: "/(main)/home" as Href,
    matchPath: "/home",
    Icon: HomeIcon,
  },
  {
    label: "Schedule",
    href: "/(main)/schedule" as Href,
    matchPath: "/schedule",
    Icon: ScheduleIcon,
  },
  {
    label: "Map",
    href: "/(main)/map" as Href,
    matchPath: "/map",
    Icon: MapIcon,
  },
  {
    label: "Events",
    href: "/(main)/event" as Href,
    matchPath: "/event",
    Icon: PeopleIcon,
  },
  {
    label: "Shop",
    href: "/(main)/shop" as Href,
    matchPath: "/shop",
    Icon: ShopIcon,
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [containerWidth, setContainerWidth] = useState(0);

  const matchedIndex = TABS.findIndex(
    ({ matchPath }) =>
      pathname === matchPath || pathname.startsWith(`${matchPath}/`),
  );
  const activeIndex = matchedIndex >= 0 ? matchedIndex : 0;

  const translateX = useRef(new Animated.Value(0)).current;
  const pillScaleX = useRef(new Animated.Value(1)).current;
  const pillScaleY = useRef(new Animated.Value(1)).current;
  const iconScales = useRef(
    TABS.map((_, i) => new Animated.Value(i === activeIndex ? 1.05 : 0.96)),
  ).current;

  const isInitialized = useRef(false);
  const prevIndex = useRef(activeIndex);

  useEffect(() => {
    if (containerWidth === 0) return;

    const tabWidth = containerWidth / TABS.length;
    const targetX = activeIndex * tabWidth + (tabWidth - PILL_WIDTH) / 2;

    if (!isInitialized.current) {
      translateX.setValue(targetX);
      isInitialized.current = true;
      prevIndex.current = activeIndex;
      return;
    }

    if (prevIndex.current === activeIndex) {
      translateX.setValue(targetX);
      return;
    }

    const distance = Math.abs(activeIndex - prevIndex.current);
    prevIndex.current = activeIndex;

    const stretchPeak = Math.min(1.16 + distance * 0.08, 1.4);

    Animated.parallel([
      Animated.spring(translateX, {
        toValue: targetX,
        stiffness: 240,
        damping: 24,
        mass: 0.9,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(pillScaleX, {
          toValue: stretchPeak,
          duration: 110,
          useNativeDriver: true,
        }),
        Animated.spring(pillScaleX, {
          toValue: 1,
          stiffness: 260,
          damping: 18,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(pillScaleY, {
          toValue: 0.88,
          duration: 110,
          useNativeDriver: true,
        }),
        Animated.spring(pillScaleY, {
          toValue: 1,
          stiffness: 260,
          damping: 18,
          useNativeDriver: true,
        }),
      ]),
      ...iconScales.map((scale, i) =>
        Animated.spring(scale, {
          toValue: i === activeIndex ? 1.05 : 0.96,
          stiffness: 280,
          damping: 20,
          useNativeDriver: true,
        }),
      ),
    ]).start();
  }, [
    activeIndex,
    containerWidth,
    translateX,
    pillScaleX,
    pillScaleY,
    iconScales,
  ]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const bottomPadding = insets.bottom > 0 ? insets.bottom : 10;

  return (
    <View style={[styles.root, { paddingBottom: bottomPadding }]}>
      <View style={styles.tabsRow} onLayout={handleLayout}>
        {containerWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.slidingPill,
              {
                transform: [
                  { translateX },
                  { scaleX: pillScaleX },
                  { scaleY: pillScaleY },
                ],
              },
            ]}
          />
        )}

        {TABS.map(({ label, href, matchPath, Icon }, index) => {
          const isActive = index === activeIndex;
          const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

          return (
            <Pressable
              key={matchPath}
              style={styles.navItem}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => {
                if (!isActive) {
                  router.navigate(href);
                }
              }}
            >
              <Animated.View
                style={[
                  styles.iconSlot,
                  { transform: [{ scale: iconScales[index] }] },
                ]}
              >
                <Icon color={color} />
              </Animated.View>
              <Text style={[styles.navText, isActive && styles.activeText]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8E5DF",
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  tabsRow: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
  },
  slidingPill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: PILL_WIDTH,
    height: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    backgroundColor: ACTIVE_PILL_BG,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconSlot: {
    height: PILL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: INACTIVE_COLOR,
  },
  activeText: {
    color: ACTIVE_COLOR,
    fontWeight: "700",
  },
});
