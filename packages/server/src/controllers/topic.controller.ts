// import { Topic } from '../../db';

export const createTopic = (req: Express.Request, res: Express.Response) => {
  console.log('Create topic', req, res);
  // return Topic.create();
};

export const getTopics = () => {
  console.log('Get topics');
  //  return Topic.findAll();
};
