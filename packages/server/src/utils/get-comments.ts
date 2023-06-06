import { IComment } from '../models/comment.model';

const getCommentsTree = (currentData: IComment[], allData: IComment[]): IComment[] => {
  if (!currentData.length) return [];

  currentData.forEach(item => {
    item.comments = [...allData.filter(value => value.parent_id === item.id)];

    getCommentsTree(item.comments, allData);
  });

  return currentData;
};

export const getNestedComments = (
  data: IComment[],
  topicId: number
): IComment[] => {
  const nestedComments = [
    ...data.filter(item => item.topic_id === topicId && !item.parent_id),
  ];

  nestedComments.forEach(comment => {
    const commentsMainLevel = data.filter(
      item => item.parent_id === comment.id
    );

    comment.comments = getCommentsTree([...commentsMainLevel], data);
  });

  return nestedComments;
};
