import { chatModel } from "../../models/chat.model.js";

export class chatManager {
  getMessages = async () => {
    try {
      return await chatModel.find().lean().exec();
    } catch (error) {
      console.log(error);
    }
  };

  createMessage = async (message) => {
    if (message.user.trim() === "" || message.message.trim() === "") {
      return null;
    }
    try {
      return await chatModel.create(message);
    } catch (error) {
      console.log(error);
    }
  };

  deleteAllMessages = async () => {
    try {
      const deletemsg = await chatModel.deleteMany({});
      return deletemsg;
    } catch (error) {
      console.log(error);
    }
  };
}
