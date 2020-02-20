import Button from 'modules/common/components/Button';
import FormControl from 'modules/common/components/form/Control';
import CommonForm from 'modules/common/components/form/Form';
import FormGroup from 'modules/common/components/form/Group';
import ControlLabel from 'modules/common/components/form/Label';
import ModalTrigger from 'modules/common/components/ModalTrigger';
import { ModalFooter } from 'modules/common/styles/main';
import { IButtonMutateProps, IFormProps } from 'modules/common/types';
import { Row } from 'modules/settings/integrations/styles';
import React from 'react';
import { TYPES } from '../../constants';
import { IProduct, IProductCategory } from '../../types';
import { generateCategoryOptions } from '../../utils';
import CategoryForm from '../productCategory/CategoryForm';

type Props = {
  product?: IProduct;
  productCategories: IProductCategory[];
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
  refetch?: any;
};

class ProductForm extends React.Component<Props> {
  renderFormTrigger = (category?: IProductCategory) => {
    const content = props => this.renderForm({ ...props, category });

    const trigger = (
      <Button btnStyle="primary" size="small" icon="add">
        Add category
      </Button>
    );

    return (
      <ModalTrigger title='Add category' trigger={trigger} content={content} />
    );
  }

  renderForm = props => {
    const { renderButton, productCategories, refetch } = this.props;

    const extendedProps = { ...props, refetch };

    return (
      <CategoryForm
        {...extendedProps}
        renderButton={renderButton}
        categories={productCategories}
      />
    );
  };

  renderContent = (formProps: IFormProps) => {
    const { renderButton, closeModal, product, productCategories } = this.props;
    const { values, isSubmitted } = formProps;
    const object = product || ({} as IProduct);

    const types = TYPES.ALL;

    if (product) {
      values._id = product._id;
    }

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>
          <FormControl
            {...formProps}
            name="name"
            defaultValue={object.name}
            autoFocus={true}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Type</ControlLabel>
          <FormControl
            {...formProps}
            name="type"
            componentClass="select"
            defaultValue={object.type}
            required={true}
          >
            {types.map((typeName, index) => (
              <option key={index} value={typeName}>
                {typeName}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Code</ControlLabel>
          <FormControl
            {...formProps}
            name="code"
            defaultValue={object.code}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Category</ControlLabel>
          <Row>
            <FormControl
              {...formProps}
              name="categoryId"
              componentClass="select"
              defaultValue={object.categoryId}
              required={true}
            >
              {generateCategoryOptions(productCategories)}
            </FormControl>
            {this.renderFormTrigger()}
          </Row>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            {...formProps}
            name="description"
            componentClass="textarea"
            rows={5}
            defaultValue={object.description}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Unit price</ControlLabel>
          <FormControl
            {...formProps}
            type="number"
            name="unitPrice"
            defaultValue={object.unitPrice}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>SKU</ControlLabel>
          <FormControl {...formProps} name="sku" defaultValue={object.sku} />
        </FormGroup>

        <ModalFooter>
          <Button btnStyle="simple" onClick={closeModal} icon="cancel-1">
            Close
          </Button>

          {renderButton({
            name: 'product and service',
            values,
            isSubmitted,
            callback: closeModal,
            object: product
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <CommonForm renderContent={this.renderContent} />;
  }
}

export default ProductForm;