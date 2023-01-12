import { isAuthenticated } from './../middleware/auth';
import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import webpush from 'web-push'

const router = Router()
const prisma = new PrismaClient()


router.post('/user/:id/get-subscriptions', [isAuthenticated], async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)

  if (typeof userId == 'number') {
    const subscriptions = await prisma.pushSubscription.findMany({
      where: {
        userId: userId
      }
    })

    if (subscriptions.length > 0) {
      res.send(200).json(subscriptions)
    } else {
      res.send(200).json([])
    }
  } else {
    res.send(500).json({ msg: 'Invalid user ID' })
  }
})

// Subscribe Route for Push Notifications
router.post('/user/:id/subscribe', [isAuthenticated], async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)
  const subscription = req.body
  const endpoint = subscription.endpoint
  const expirationTime = subscription.expirationTime
  const p256dh = subscription.keys.p256dh
  const auth = subscription.keys.auth

  if (typeof userId == 'number') {
    await prisma.pushSubscription.create({
      data: {
        userId: userId,
        endpoint: endpoint,
        expirationTime: expirationTime,
        p256dhKey: p256dh,
        authKey: auth
      }
    })

    res.status(201).json({ msg: 'Success' })
  } else {
    res.send(500).json({ msg: 'Invalid user ID' })
  }
});

router.post('/user/:id/send-notification', [isAuthenticated], async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)

  if (typeof userId == 'number') {
    const subscriptions = await prisma.pushSubscription.findMany({
      where: {
        userId: userId
      }
    })

    if (subscriptions.length > 0) {
      setWebPushVapidDetails()

      subscriptions.forEach((row: { endpoint: any; expirationTime: any; p256dhKey: any; authKey: any; }) => {
        let subscription = {
          endpoint: row.endpoint,
          expirationTime: row.expirationTime,
          keys: {
            p256dh: row.p256dhKey,
            auth: row.authKey
          }
        };

        let payload = JSON.stringify({
          title: 'Neue Notification',
          body: 'Dies ist eine Push Nachricht',
          icon: 'https://cdn-icons-png.flaticon.com/512/187/187130.png'
        });

        webpush.sendNotification(subscription, payload).catch(err => console.error(err));
        res.status(200).json({ msg: 'Notification send successfully ' })
      })
    }
  } else {
    res.send(500).json({ msg: 'Invalid user ID' })
  }
})

router.delete('/user/:id/unsubscribe', [isAuthenticated], async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)

  if (typeof userId == 'number') {
    await prisma.pushSubscription.deleteMany({
      where: {
        userId: userId
      }
    })

    res.status(200).json({
      msg: 'Subscriptions deleted'
    })
  } else {
    res.send(500).json({ msg: 'Invalid user ID' })
  }
})

const setWebPushVapidDetails = () => {
  const VAPID_MAIL = process.env.VAPID_MAIL || ''
  const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || ''
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || ''

  webpush.setVapidDetails(
    `mailto:${VAPID_MAIL}`,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  )
}

export default router
