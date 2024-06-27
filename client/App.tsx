import { View, Text, ScrollView, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { IconSearch, IconMenu } from './assets'
import FastImage from 'react-native-fast-image'
import { setCustomText } from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'Laila-SemiBold',
    fontSize: 16,
  }
};

setCustomText(customTextProps);

const Home = () => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>

        {/* Topbar */}
        <View style={styles.topBar}>

          <View style={[styles.cityContainer, { alignItems: 'flex-start', flex: 0.2 }]}>
            <View style={styles.containerSidebar}>
              <TouchableOpacity>
                <IconMenu />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cityContainer}>
            <Text style={styles.cityText}>Balikpapan</Text>
          </View>
          <View style={[styles.cityContainer, { flex: 0.2 }]} />

        </View>
        {/* Topbar */}

        {/* content */}
        <View>
          <View style={styles.content}>
            <FastImage
              source={require("./assets/images/clear.gif")}
              style={styles.contentGif}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ fontSize: 90, fontFamily:"Laila-SemiBold", color: "white" }}>
                60°
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end", margin: 30, marginLeft: 0 }}>
              <Text style={{ fontSize: 16 }}>
                Clear
              </Text>
              <Text style={{ fontSize: 16 }}>
                H: 63° | L: 51°
              </Text>
            </View>
          </View>
          {/* content */}

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

            {/* Today Card */}
            <View style={{ width: 100, alignItems: "center", padding: 10, borderRadius: 20, backgroundColor: "#268696" }}>
              <Text style={{ fontSize: 16 }}>
                TODAY
              </Text>
              <View>
                <FastImage
                  source={require("./assets/images/rainandthunder2.gif")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 14, marginTop: 3 }}>
                  51°/ 63°
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Thunderstorm
                </Text>
              </View>
            </View>
            {/* Today Card */}

            {/* 3-Day Forecast */}
            <View style={{ width: 210, padding: 12, borderRadius: 20, backgroundColor: "#268696"}}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                3-DAY FORECAST
              </Text>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: "row"}}>
                <View style={styles.weatherCard}>
                  <View style={{ alignItems: "center" }}>
                    <FastImage
                      source={require("./assets/images/rainandthunder2.gif")}
                      style={{ width: 45, height: 45 }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 11, marginTop: 3 }}>
                      51°/ 63°
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                      Thunderstorm
                    </Text>
                  </View>
                </View>

                <View style={styles.weatherCard}>
                  <View style={{ alignItems: "center" }}>
                    <FastImage
                      source={require("./assets/images/rainandthunder2.gif")}
                      style={{ width: 45, height: 45 }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 11, marginTop: 3 }}>
                      51°/ 63°
                    </Text>
                    <Text style={{ fontSize: 8, marginBottom: 5 }}>
                      Thunderstorm
                    </Text>
                  </View>
                </View>

                <View style={styles.weatherCard}>
                  <View style={{ alignItems: "center" }}>
                    <FastImage
                      source={require("./assets/images/rainandthunder2.gif")}
                      style={{ width: 45, height: 45 }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 11, marginTop: 3 }}>
                      51°/ 63°
                    </Text>
                    <Text style={{ fontSize: 8 }}>
                      Thunderstorm
                    </Text>
                  </View>
                </View>
              </ScrollView>

            </View>
            {/* 3-Day Forecast */}

          </View>
        </View>
        {/* content */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#117A8E",
  },
  container: {
    margin: 30,
    borderWidth: 1
  },
  containerSidebar: {
    padding: 10,
    backgroundColor: "rgba(122, 178, 178, 0.2)",
    borderRadius: 15,
  },
  cityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
  },
  cityText: {
    fontFamily: "Laila-SemiBold",
    color: "white",
    fontSize: 20
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentGif: {
    width: 300,
    height: 300
  },
  weatherCard: {
    borderRadius: 15,
    borderColor: "#0D6677",
    padding: 10,
    borderWidth: 1,
    marginRight: 10
  }
})

export default Home