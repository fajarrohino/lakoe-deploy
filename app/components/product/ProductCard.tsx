import { Box, Checkbox, Switch, Text, Image } from '@chakra-ui/react';
import { useState, type ReactNode } from 'react';
import { FaCircle } from 'react-icons/fa';
import type { IProduct } from '~/interfaces/product/product';
import { db } from '~/libs/prisma/db.server';

interface IProductCardProps {
  product: IProduct;
  children?: ReactNode;
  isChecked: boolean;
}

export default function ProductCard(props: IProductCardProps) {
  const { product, children, isChecked } = props;
  const [isActive, setIsActive] = useState(product.isActive);
  const handleSwitchChange = async () => {
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        isActive: !isActive,
      },
    });
    setIsActive(!isActive);
  };

  return (
    <>
      <Box
        mt={3}
        p={3}
        borderWidth="2px"
        borderRadius={'10px'}
        key={product.id}
      >
        <Box display={'flex'} gap={3}>
          <Box display={'flex'} gap={3}>
            <Image
              src={product.attachments[0].url}
              w={'100px'}
              h={'100px'}
              borderRadius={'8px'}
              objectFit={'cover'}
            />
            <Box>
              <Text
                fontSize={'18px'}
                color={'#1D1D1D'}
                w={'375px'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
              >
                {product.name}
              </Text>
              <Box display={'flex'} alignItems={'center'} gap={2} mb={2}>
                <Text fontSize={'16px'}>
                  Rp
                  {product.variants.map((a) =>
                    a.variantOptions.map((b) =>
                      b.variantOptionValues.map((c) => c.price)
                    )
                  )}
                </Text>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={2}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>
                    Stok:{' '}
                    {product.variants.map((a) =>
                      a.variantOptions.map((b) =>
                        b.variantOptionValues.map((c) => c.stock)
                      )
                    )}
                  </Text>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  gap={1}
                  color={'gray'}
                >
                  <FaCircle size="5px" />
                  <Text fontSize={'16px'}>
                    SKU:{' '}
                    {product.variants.map((a) =>
                      a.variantOptions.map((b) =>
                        b.variantOptionValues.map((c) => c.sku)
                      )
                    )}
                  </Text>
                </Box>
              </Box>
              {children}
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'flex-end'}
            flexDirection={'column'}
            py={1}
            gap={10}
          >
            <Checkbox size="lg" isChecked={isChecked} />
            <Switch
              type="submit"
              size="md"
              isChecked={isActive}
              onChange={handleSwitchChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
