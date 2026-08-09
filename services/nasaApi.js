import { API_KEY, BASE_URL } from "../constants/config";

// ==========================================
// NASA APOD
// ==========================================

export async function getAPOD() {
  const url =
    `${BASE_URL}/planetary/apod?api_key=${API_KEY}`;

  console.log("APOD URL:", url);

  const response = await fetch(url);
  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    console.log("APOD RESPONSE:", text);
    throw new Error("NASA APOD returned invalid JSON");
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
      "Failed to load APOD"
    );
  }

  return data;
}


// ==========================================
// NASA Mars Images
// NASA Image and Video Library
// ==========================================

export async function getMarsPhotos(date) {
  try {
    const year = date.substring(0, 4);

    let allItems = [];

    // ค้นหลายหน้าเพื่อเพิ่มโอกาสเจอรูปของวันที่เลือก
    for (let page = 1; page <= 5; page++) {

      const url =
        `https://images-api.nasa.gov/search` +
        `?q=Curiosity` +
        `&media_type=image` +
        `&year_start=${year}` +
        `&year_end=${year}` +
        `&page=${page}` +
        `&page_size=100`;

      console.log(
        `NASA IMAGE API PAGE ${page}:`,
        url
      );

      const response = await fetch(url);
      const text = await response.text();

      console.log(
        `NASA IMAGE API STATUS PAGE ${page}:`,
        response.status
      );

      let data;

      try {
        data = JSON.parse(text);
      } catch (error) {
        console.log(
          "NASA IMAGE API RESPONSE:",
          text.substring(0, 300)
        );

        throw new Error(
          "NASA Image API returned invalid JSON"
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.reason ||
          data?.message ||
          "NASA Image API Error"
        );
      }

      const items =
        data?.collection?.items || [];

      allItems = [
        ...allItems,
        ...items
      ];

      // ถ้าหน้านี้ไม่มีข้อมูลแล้ว หยุด
      if (items.length === 0) {
        break;
      }
    }

    console.log(
      "NASA TOTAL ITEMS:",
      allItems.length
    );

    // ==========================================
    // กรองวันที่จริง
    // ==========================================

    const marsPhotos = allItems
      .filter((item) => {

        const info =
          item?.data?.[0];

        if (!info) {
          return false;
        }

        const createdDate =
          info.date_created || "";

        const imageDate =
          createdDate.substring(0, 10);

        const title =
          info.title?.toLowerCase() || "";

        const description =
          info.description?.toLowerCase() || "";

        const keywords =
          info.keywords || [];

        const keywordText =
          keywords
            .join(" ")
            .toLowerCase();

        const isMars =
          title.includes("mars") ||
          title.includes("curiosity") ||
          description.includes("mars") ||
          description.includes("curiosity") ||
          keywordText.includes("mars") ||
          keywordText.includes("curiosity");

        const isCorrectDate =
          imageDate === date;

        return (
          isMars &&
          isCorrectDate
        );
      })

      .map((item) => {

        const info =
          item?.data?.[0];

        const imageLink =
          item?.links?.find(
            (link) =>
              link.rel === "preview"
          );

        return {
          id:
            info?.nasa_id ||
            Math.random().toString(),

          title:
            info?.title ||
            "Mars Rover Image",

          description:
            info?.description ||
            "",

          date:
            info?.date_created ||
            "",

          img_src:
            imageLink?.href ||
            null,
        };
      })

      .filter(
        (photo) =>
          photo.img_src
      );

    console.log(
      "MARS PHOTOS FOR DATE:",
      marsPhotos.length
    );

    return marsPhotos;

  } catch (error) {

    console.log(
      "getMarsPhotos ERROR:",
      error
    );

    throw error;
  }
}