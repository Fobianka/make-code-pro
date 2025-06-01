import { Flex, Form, Input, Select } from 'antd';
import { debounce } from 'lodash';

import { SearchParamsProps } from '../types';
import { useGetBrandsQuery } from '../queries/brandsApi';

const Navbar = ({ searchParams, handleChangeFilters }: SearchParamsProps) => {
  const selectedCategory = searchParams.get('category');

  const debouncedHandlerPrice = debounce(
    (key: string, value: string) => handleChangeFilters(key, value),
    700
  );

  const { data, error, isLoading } = useGetBrandsQuery();
  console.log(data);

  const options = data?.map((brand) => ({ label: brand, value: brand }));

  return (
    <>
      <div className="navbar">
        <div
          onClick={() => handleChangeFilters('category', 'phone')}
          className={selectedCategory === 'phone' ? 'active' : ''}
        >
          Телефоны
        </div>
        <div
          onClick={() => handleChangeFilters('category', 'laptop')}
          className={selectedCategory === 'laptop' ? 'active' : ''}
        >
          Ноутбуки
        </div>
        <div
          onClick={() => handleChangeFilters('category', 'monitor')}
          className={selectedCategory === 'monitor' ? 'active' : ''}
        >
          Мониторы
        </div>
      </div>
      <div className="navbar-brendsBlock">
        {error && <span style={{ color: 'red' }}>{'error'}</span>}
        <h4>Бренд</h4>
        <Form.Item layout="vertical">
          <Select
            onSelect={(value) => handleChangeFilters('q', value)}
            loading={isLoading}
            options={options}
          />
        </Form.Item>
      </div>
      <div className="navbar-priceBlock">
        <h4>Цена</h4>
        <Flex gap="middle">
          <Input
            onChange={(e) => debouncedHandlerPrice('price_gte', e.target.value)}
            defaultValue={searchParams.get('price_gte') || ''}
          />
          <Input
            onChange={(e) => debouncedHandlerPrice('price_lte', e.target.value)}
            defaultValue={searchParams.get('price_lte') || ''}
          />
        </Flex>
      </div>
    </>
  );
};

export default Navbar;
