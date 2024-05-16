type UserProfileProps = {
  username: string;
  profileUrl: string;
  userId: string;
};

type UserProps = {
  uid?: string | undefined;
  email?: string | null | undefined;
  username?: any;
  profileUrl?: any;
};

type MessageProps = {
  userId: string;
  message: string;
  profileUrl: string;
  senderName: string;
  createdAt: Date;
};

type MessageRes = {
  userId: string;
  message: string;
  profileUrl: string;
  senderName: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
};
