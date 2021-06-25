import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { Messages_Update_Column } from '../../../graphql/generated'
import GqlSdkHelper from '../../../utils/GqlSdkHelper'
import { HttpStatusCode } from '../../../utils/typedFetch/HttpStatusCode'

interface SpaceFlightNewsApiType {
  id: string
  title: string
  url: string
  imageUrl: string
  newsSite: string
  summary: string
  publishedAt: Date
  updatedAt: Date
  featured: boolean
  launches: any[]
  events: any[]
}

export default async function API(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const resSpace = await fetch(
          `https://www.spaceflightnewsapi.net/api/v2/articles?_limit=1&_start=${Math.floor(
            Math.random() * 8000
          )}`
        )
        const spaceJson = (await resSpace.json()) as SpaceFlightNewsApiType[]

        // add message
        const messageResponseData = await new GqlSdkHelper().getSdk().insert_messages_one({
          message: {
            title: spaceJson?.[0]?.title,
            body: spaceJson?.[0]?.summary,
            url: spaceJson?.[0]?.url,
            imageUrl: spaceJson?.[0]?.imageUrl,
            publishedAt: spaceJson?.[0]?.publishedAt,
          },
          update_columns: Object.values(Messages_Update_Column),
        })

        // add a tag
        // const messagesTagResponseData = await new GqlSdkHelper().getSdk().messagesTagInsertOne({
        //   message_tag: {
        //     message_id: messageResponseData.insert_messages_one.id,
        //     tag_id: 1,
        //   },
        // })

        // list all
        const messagesLast6 = await new GqlSdkHelper().getSdk().messages()

        const messagesDeleted = await new GqlSdkHelper().getSdk().delete_messages({
          message_id: _.last(messagesLast6.messages)?.id,
        })

        res.json({ messageResponseData, messagesDeleted })
      } catch (e) {
        res.statusCode = 500
        console.error('Request error', e)
        res.json({
          error: e.message,
        })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(HttpStatusCode.METHOD_NOT_ALLOWED_405).end(`Method ${method} Not Allowed`)
  }
}
