import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare login_At: Date | null;
  declare logout_At: Date | null;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    login_At: { type: DataTypes.DATE, allowNull: true },
    logout_At: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
