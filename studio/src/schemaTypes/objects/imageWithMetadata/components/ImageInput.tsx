// schemas/image/components/ImageInput.jsx

import {Button, Card, Dialog, Flex, Label, Stack, TextInput, useToast} from '@sanity/ui'
import {MetadataImage} from '../../../../lib/types'
import {useCallback, useEffect, useState} from 'react'
import {sleep} from '../utils/sleep'
import {useClient} from 'sanity'
import {handleGlobalMetadataConfirm} from '../utils/handleGlobalMetadataConfirm'
import Metadata from './Metadata'

const ImageInput = (props: any) => {
  const requiredFields = props.schemaType?.options?.requiredFields ?? []

  const fields = [
    {
      name: 'altText',
      title: 'Alt Text',
      required: requiredFields.some((field: any) => field === 'altText'),
    },
    {
      name: 'title',
      title: 'Title',
      required: requiredFields.some((field: any) => field === 'title'),
    },
    {
      name: 'description',
      title: 'Description',
      required: requiredFields.some((field: any) => field === 'description'),
    },
  ]

  const imageId = props.value?.asset?._ref
  const toast = useToast() // import from '@sanity/ui'
  const client = useClient({apiVersion: '2023-03-25'})

  /** State to store the image metadata */
  const [sanityImage, setSanityImage] = useState<MetadataImage | null>(null)

  /** Dialog (dialog-image-defaults) */
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => setOpen(true), [])

  const fieldsToValidate = requiredFields.reduce((acc: any, field: any) => {
    if (field.required) {
      return {...acc, [field.name]: false}
    }
    return acc
  }, {})

  /** Error state used for disabling buttons in case of missing data */
  const [validationStatus, setValidationStatus] = useState(fieldsToValidate)

  /** Handle Change from Inputs in the metadata modal
   *
   * @param {string} event is the value of the input
   * @param {string} field is the input name the change is made in (corresponds with the field name on the sanity.imageAsset type)
   */
  const handleChange = useCallback(
    (event: string, field: string) => {
      /* unset value */
      event === ''
        ? setSanityImage((prevSanityImage: any) => ({
            ...prevSanityImage,
            [field]: '',
          }))
        : setSanityImage((prevSanityImage: any) => ({
            ...prevSanityImage,
            [field]: event,
          }))

      const isFieldToValidate = fieldsToValidate[field] !== undefined
      isFieldToValidate &&
        setValidationStatus((prevValidationStatus: any) => ({
          ...prevValidationStatus,
          [field]: event.trim() !== '' ? true : false,
        }))
    },
    [fieldsToValidate],
  )

  /*
   * Fetching the global image data
   */
  useEffect(() => {
    /** Initialising the subscription
     *
     * we need to initialise the subscription so we can then listen for changes
     */
    let subscription: any

    const query = `*[_type == "sanity.imageAsset" && _id == $imageId ][0]{
      _id,
      altText,
      title, 
      description,
    }`
    const params = {imageId: imageId}

    const fetchReference = async (listening = false) => {
      /** Debouncing the listener
       */
      listening && (await sleep(1500))

      /** Fetching the data */
      await client
        .fetch(query, params)
        .then((res) => {
          setSanityImage(res)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }

    /** since we store our referenced data in a state we need to make sure, we also listen to changes */
    const listen = () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      subscription = client
        .listen(query, params, {visibility: 'query'})
        .subscribe(() => fetchReference(true))
    }

    /** we only want to run the fetchReference function if we have a imageId (from the context) */
    imageId ? fetchReference().then(listen) : setSanityImage(null as any)

    /** and then we need to cleanup after ourselves, so we don't get any memory leaks */
    return function cleanup() {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, client])

  const inputs = fields.map((field) => {
    return (
      <Card paddingBottom={4} key={field.name}>
        <label>
          <Stack space={3}>
            <Label muted size={1}>
              {field.title}
            </Label>
            <TextInput
              id="imageTitle"
              fontSize={2}
              onChange={(event) => handleChange(event.currentTarget.value, field.name)}
              placeholder={field.title}
              value={sanityImage ? (sanityImage[field.name] as string) : ''}
              required={field.required}
            />
          </Stack>
        </label>
      </Card>
    )
  })

  return (
    <div>
      {/* * * DEFAULT IMAGE INPUT * * *
       */}
      {props.renderDefault(props)}

      {/* * * METADATA PREVIEW DISPLAYED UNDERNEATH INPUT * * *
       */}
      <Stack paddingY={3}>
        {sanityImage && (
          <Stack space={3} paddingBottom={2}>
            <Metadata title="Alt Text" value={sanityImage?.altText} />
            <Metadata title="Title" value={sanityImage?.title} />
            <Metadata title="Description" value={sanityImage?.description} />
          </Stack>
        )}
        {/* * * BUTTON TO OPEN EDIT MODAL * * *
         */}
        <Flex paddingY={3}>
          <Button
            mode="ghost"
            onClick={onOpen}
            disabled={imageId ? false : true}
            text="Edit metadata"
          />
        </Flex>
      </Stack>
      {/* * * METADATA INPUT MODAL * *
       */}
      {open && (
        <Dialog
          header="Edit image metadata"
          id="dialog-image-defaults"
          onClose={onClose}
          zOffset={1000}
          width={2}
        >
          <Card padding={5}>
            <Stack space={3}>
              {/*
               * * * INPUT FIELDS * * *
               */}
              {inputs}

              {/*
               * * * SUBMIT BUTTON * * *
               */}
              <Button
                mode="ghost"
                onClick={() =>
                  handleGlobalMetadataConfirm({
                    sanityImage,
                    toast,
                    client,
                    onClose,
                  })
                }
                text="Save global changes"
                disabled={!Object.values(validationStatus).every((isValid) => isValid)}
              />
            </Stack>
          </Card>
        </Dialog>
      )}
    </div>
  )
}

export default ImageInput
