const { axiosFacebookInstance } = require("../axios");

async function getInboxController({ page_access_token }) {
  try {
    const { data } = await axiosFacebookInstance.get(
      `/me/conversations?access_token=${page_access_token}&fields=id,name,messages{from,to,message,id,is_unsupported,created_time,attachments{file_url,id,image_data,mime_type}}&limit=10`
    );

    return { data };
  } catch (error) {
    return { error };
  }
}

module.exports = { getInboxController };
