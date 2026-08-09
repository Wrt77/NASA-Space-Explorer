import React, {
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";

import DateTimePicker from
  "@react-native-community/datetimepicker";

import {
  getMarsPhotos,
} from "../services/nasaApi";

import PhotoCard from
  "../components/PhotoCard";

import Loading from
  "../components/Loading";

import ErrorMessage from
  "../components/ErrorMessage";


const { width, height } =
  Dimensions.get("window");


// ==========================================
// แปลง Date เป็น YYYY-MM-DD
// ป้องกันปัญหา Timezone
// ==========================================

function formatDate(date) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


// ==========================================
// Mars Screen
// ==========================================

export default function MarsScreen() {

  const [
    date,
    setDate,
  ] = useState(
    new Date("2019-12-10")
  );

  const [
    showPicker,
    setShowPicker,
  ] = useState(false);

  const [
    photos,
    setPhotos,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    selectedPhoto,
    setSelectedPhoto,
  ] = useState(null);


  // ========================================
  // ค้นหารูป
  // ========================================

  const searchPhotos =
    async () => {

      try {

        setLoading(true);
        setError("");
        setPhotos([]);

        const selectedDate =
          formatDate(date);

        console.log(
          "SELECTED DATE:",
          selectedDate
        );

        const result =
          await getMarsPhotos(
            selectedDate
          );

        setPhotos(result);

        if (
          result.length === 0
        ) {

          setError(
            `ไม่พบรูป Mars Rover ในวันที่ ${selectedDate}`
          );

        }

      } catch (err) {

        console.log(
          "Mars Search Error:",
          err
        );

        setPhotos([]);

        setError(
          "ไม่สามารถโหลดข้อมูลจาก NASA ได้ กรุณาลองใหม่อีกครั้ง"
        );

      } finally {

        setLoading(false);

      }
    };


  // ========================================
  // วันที่เปลี่ยน
  // ========================================

  const handleDateChange =
    (
      event,
      selectedDate
    ) => {

      setShowPicker(false);

      if (selectedDate) {

        setDate(
          selectedDate
        );

        setPhotos([]);
        setError("");
      }
    };


  // ========================================
  // เปิดรูปเต็มจอ
  // ========================================

  const openImage =
    (photo) => {

      setSelectedPhoto(
        photo
      );

    };


  // ========================================
  // ปิดรูปเต็มจอ
  // ========================================

  const closeImage =
    () => {

      setSelectedPhoto(
        null
      );

    };


  return (

    <SafeAreaView
      style={styles.safeArea}
    >

      <View
        style={styles.container}
      >

        {/* =================================
            Header
        ================================= */}

        <View
          style={styles.header}
        >

          <Text
            style={styles.headerIcon}
          >
            🔴
          </Text>

          <Text
            style={styles.headerTitle}
          >
            Mars Rover Explorer
          </Text>

          <Text
            style={styles.selectedDate}
          >
            {formatDate(date)}
          </Text>

        </View>


        {/* =================================
            เลือกวันที่
        ================================= */}

        <Pressable
          style={styles.button}
          onPress={() =>
            setShowPicker(true)
          }
        >

          <Text
            style={styles.buttonText}
          >
            📅 เลือกวันที่
          </Text>

        </Pressable>


        {/* =================================
            Date Picker
        ================================= */}

        {showPicker && (

          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={
              handleDateChange
            }
            maximumDate={
              new Date()
            }
          />

        )}


        {/* =================================
            ปุ่มค้นหา
        ================================= */}

        <Pressable
          style={styles.button}
          onPress={
            searchPhotos
          }
          disabled={loading}
        >

          <Text
            style={styles.buttonText}
          >
            🔍 ค้นหารูป
          </Text>

        </Pressable>


        {/* =================================
            Loading
        ================================= */}

        {loading && (
          <Loading />
        )}


        {/* =================================
            Error
        ================================= */}

        {!loading && (
          <ErrorMessage
            message={error}
          />
        )}


        {/* =================================
            รูปภาพ
        ================================= */}

        {!loading &&
          photos.length > 0 && (

            <FlatList
              data={photos}
              keyExtractor={(item) =>
                item.id.toString()
              }
              renderItem={({
                item,
              }) => (

                <PhotoCard
                  photo={item}
                  onPress={
                    openImage
                  }
                />

              )}
              contentContainerStyle={
                styles.list
              }

              showsVerticalScrollIndicator={
                false
              }
            />

          )}


        {/* =================================
            ข้อความเริ่มต้น
        ================================= */}

        {!loading &&
          !error &&
          photos.length === 0 && (

            <View
              style={styles.empty}
            >

              <Text
                style={styles.emptyIcon}
              >
                🔭
              </Text>

              <Text
                style={styles.emptyTitle}
              >
                สำรวจดาวอังคาร
              </Text>

              <Text
                style={styles.emptyText}
              >
                เลือกวันที่แล้วกด
                {" "}
                "ค้นหารูป"
                {" "}
                เพื่อค้นหาภาพจาก NASA
              </Text>

            </View>

          )}


        {/* =================================
            Image Modal
        ================================= */}

        <Modal
          visible={
            selectedPhoto !== null
          }
          transparent={true}
          animationType="fade"
          onRequestClose={
            closeImage
          }
        >

          <View
            style={styles.modalBackground}
          >

            {/* ปุ่มปิด */}

            <Pressable
              style={styles.closeButton}
              onPress={
                closeImage
              }
            >

              <Text
                style={styles.closeText}
              >
                ✕
              </Text>

            </Pressable>


            {/* รูปใหญ่ */}

            {selectedPhoto && (

              <Image
                source={{
                  uri:
                    selectedPhoto.img_src,
                }}
                style={
                  styles.fullImage
                }
                resizeMode="contain"
              />

            )}


            {/* ชื่อรูป */}

            {selectedPhoto && (

              <View
                style={styles.modalInfo}
              >

                <Text
                  style={
                    styles.modalTitle
                  }
                  numberOfLines={2}
                >
                  {
                    selectedPhoto.title
                  }
                </Text>

                <Text
                  style={
                    styles.modalDate
                  }
                >
                  📅{" "}
                  {
                    selectedPhoto.date
                  }
                </Text>

              </View>

            )}

          </View>

        </Modal>

      </View>

    </SafeAreaView>

  );
}


// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8FC",
  },

  container: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },

  headerIcon: {
    fontSize: 42,
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#16458A",
    textAlign: "center",
  },

  selectedDate: {
    marginTop: 8,
    fontSize: 18,
    color: "#666",
  },

  button: {
    marginHorizontal: 20,
    marginTop: 10,

    backgroundColor: "#2196F3",

    paddingVertical: 15,

    borderRadius: 8,

    alignItems: "center",

    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  list: {
    paddingTop: 12,
    paddingBottom: 30,
  },

  empty: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 50,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#16458A",
  },

  emptyText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",

    justifyContent: "center",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",

    top: 45,
    right: 20,

    width: 45,
    height: 45,

    borderRadius: 25,

    backgroundColor:
      "rgba(255,255,255,0.2)",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
  },

  fullImage: {
    width: width,
    height: height * 0.7,
  },

  modalInfo: {
    position: "absolute",

    bottom: 30,

    left: 20,
    right: 20,

    backgroundColor:
      "rgba(0,0,0,0.75)",

    padding: 15,

    borderRadius: 12,
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  modalDate: {
    color: "#DDDDDD",
    marginTop: 5,
    fontSize: 13,
  },

});