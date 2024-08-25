import chatController from "../../service/chatController/ChatController";

export default async function getUsersChat(id: string) {
  const usersLogin: string[] = [];
  await chatController.getUsersChat(id).then((res) => {
    if (Array.isArray(res)) {
      res.forEach((user) => {
        usersLogin.push(user.login);
      });
    }
  });

  return usersLogin;
}
