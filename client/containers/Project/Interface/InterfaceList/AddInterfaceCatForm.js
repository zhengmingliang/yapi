import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { Form,Select, Input, Button } from 'antd';
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class AddInterfaceForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    catdata: PropTypes.array,
    catid: PropTypes.number,
    parent_id: PropTypes.parent_id
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };


  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
            {...formItemLayout}
            label="上级分类"
        >
          {getFieldDecorator('parent_id', {
            initialValue: this.props.catid ? this.props.catid + '' : this.props.catdata[0]._id + ''
          })(
              <Select>
                {this.props.catdata.map(item => {
                  return <Option key={item._id} value={item._id + ""}>{item.name}</Option>
                })}
              </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="分类名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入分类名称!'
              }
            ],
            initialValue: this.props.catdata ? this.props.catdata.name || null : null
          })(<Input placeholder="分类名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('desc', {
            initialValue: this.props.catdata ? this.props.catdata.desc || null : null
          })(<Input placeholder="备注" />)}
        </FormItem>

        <FormItem className="catModalfoot" wrapperCol={{ span: 24, offset: 8 }}>
          <Button onClick={this.props.onCancel} style={{ marginRight: '10px' }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddInterfaceForm);
