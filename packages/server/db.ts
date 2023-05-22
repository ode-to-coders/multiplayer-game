import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { topicModel } from './src/models/topic.model';
import { commentModel } from './src/models/comment.model';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

export const Topic = sequelize.define('Topic', topicModel);
export const Comment = sequelize.define('Comment', commentModel);

Topic.hasMany(Comment, {
  foreignKey: 'topic_id',
});
Comment.belongsTo(Topic);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
