import { Button, Form, Input } from 'antd';
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../reduxHooks';

// import { createComment, loadComments } from '../productSlice';
import './ProductComments.css';
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '../../../queries/commentsApi';

type CommentForm = {
  userName: string;
  userText: string;
};

const ProductComments = ({ productId }: { productId: number }) => {
  // const dispatch = useAppDispatch();
  // const { comments } = useAppSelector((state) => state.product);

  const [form] = Form.useForm();

  const { data: comments } = useGetCommentsQuery(productId);
  const [addComment] = useAddCommentMutation();

  const handleSubmit = (values: CommentForm) => {
    const date = new Date().toLocaleString();
    // const newComment = { ...values, productId, date };
    addComment({ ...values, productId, date });

    // dispatch(createComment(newComment));

    form.resetFields();
  };

  // useEffect(() => {
  //   dispatch(loadComments(productId));
  // }, [productId]);

  return (
    <div className="product-comments">
      <h3>Отзывы</h3>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="userName">
          <Input placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item name="userText">
          <Input.TextArea placeholder="Комментарий" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>

      <div className="product-comments-box">
        {comments?.map((comment) => (
          <div className="product-comments-item" key={comment.id}>
            <span>{comment.userName}</span>
            <span>{comment.date}</span>
            <div>{comment.userText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
