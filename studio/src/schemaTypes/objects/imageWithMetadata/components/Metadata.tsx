//schemas/image/components/Metadata.jsx

import {Flex, Text} from '@sanity/ui'

const Metadata = ({title, value}: {title: string; value: string | undefined}) => {
  return (
    <Flex gap={1}>
      <Text weight="bold" muted size={1}>
        {title}:
      </Text>
      <Text size={1} muted>
        {value ? `${value?.substring(0, 80)}${value?.length < 80 ? '' : '...'}` : '-'}
      </Text>
    </Flex>
  )
}

export default Metadata
