interface IUserProps {
  username: string;
  password: string;
}

export class User {
  username: string;
  password: string;

  constructor(props: IUserProps) {
    this.username = props.username;
    this.password = props.password;
  }
}
