_contents_

1. **Auth Stuff**
2. **Categories**
3. **Workshops**


## Everything to do with registeration and account management.

We use devise_auth_token in the backend.

See either:

1. https://github.com/lynndylanhurley/devise_token_auth#usage-tldr (basic stuff)
2. https://github.com/lynndylanhurley/devise_token_auth#usage-cont (for proper use of them)

A couple of examples are below (you can use `export SERVER=https://bluecarbuncle-staging.herokuapp.com`)

1. Registration
   
   `curl -vv -XPOST -H 'Content-Type: application/json' $SERVER/auth -d '{ "email": "hello6@example.com", "password": "foobar123", "password_confirmation": "foobar123"}'`

  Note that you should give a real email address, because you'll get email there which will need the confirmation email.

2. Signing in (the same user as above)
   
   `curl -vv -XPOST -H 'Content-Type: application/json' $SERVER/auth/sign_in -d '{ "email": "hello6@example.com", "password": "foobar123"}'`


For subsequent calls, always use the header info as needed. That is, do include the following three in the request header (ALWAYS)
example: 

```
access-token: a2ogichPDLClSgmyOSJ7dw
client: WCCazKg2ek_YhRLFGSg4bw
uid: hello6@example.com
```

The auth end points are:
(NOTE: initally, I have removed the omniauth providers)

```
                              Prefix Verb       URI Pattern                                                                       Controller#Action
                        user_session POST       /auth/sign_in                                                                devise_token_auth/sessions#create
                destroy_user_session DELETE     /auth/sign_out                                                               devise_token_auth/sessions#destroy
                       user_password PATCH      /auth/password                                                               devise_token_auth/passwords#update
                                     PUT        /auth/password                                                               devise_token_auth/passwords#update
                                     POST       /auth/password                                                               devise_token_auth/passwords#create
            cancel_user_registration GET        /auth/cancel                                                                 devise_token_auth/registrations#cancel
                   user_registration PATCH      /auth                                                                        devise_token_auth/registrations#update
                                     PUT        /auth                                                                        devise_token_auth/registrations#update
                                     DELETE     /auth                                                                        devise_token_auth/registrations#destroy
                                     POST       /auth                                                                        devise_token_auth/registrations#create
                   user_confirmation GET        /auth/confirmation                                                           devise_token_auth/confirmations#show
                                     POST       /auth/confirmation                                                           devise_token_auth/confirmations#create
                 auth_validate_token GET        /auth/validate_token                                                         devise_token_auth/token_validations#validate_token
```

### Categories 

**These are the main classes or workshops**                

Fetch the available categories.
As they are maintained only by the admins, we have only GET end points

```
                              Prefix Verb       URI Pattern                                                                       Controller#Action
                          categories GET        /categories.json                                                             categories#index
                            category GET        /categories/:id.json                                                         categories#show
```

### Workshops

**These are the core items of the app we're building**

The endpoints are generally freely accessible except create/delete/update

```
                              Prefix Verb       URI Pattern                                                                       Controller#Action
                           workshops GET        /workshops.json                                                              workshops#index
                                     POST       /workshops.json                                                              workshops#create
                            workshop GET        /workshops/:id.json                                                          workshops#show
                                     PATCH      /workshops/:id.json                                                          workshops#update
                                     PUT        /workshops/:id.json                                                          workshops#update
                                     DELETE     /workshops/:id.json                                                          workshops#destroy
```

## Temporary END of Document.

---
---


The rest of this, we can have up an running in a few days.

                              Prefix Verb       URI Pattern                                                                       Controller#Action
     workshop_workshop_registrations GET        /workshops/:workshop_id/workshop_registrations.json                          workshop_registrations#index
                                     POST       /workshops/:workshop_id/workshop_registrations.json                          workshop_registrations#create
      workshop_workshop_registration GET        /workshops/:workshop_id/workshop_registrations/:id.json                      workshop_registrations#show
                                     PATCH      /workshops/:workshop_id/workshop_registrations/:id.json                      workshop_registrations#update
                                     PUT        /workshops/:workshop_id/workshop_registrations/:id.json                      workshop_registrations#update
                                     DELETE     /workshops/:workshop_id/workshop_registrations/:id.json                      workshop_registrations#destroy

                   workshop_bookings GET        /workshops/:workshop_id/bookings.json                                        bookings#index
                                     POST       /workshops/:workshop_id/bookings.json                                        bookings#create
                    workshop_booking GET        /workshops/:workshop_id/bookings/:id.json                                    bookings#show
                                     PATCH      /workshops/:workshop_id/bookings/:id.json                                    bookings#update
                                     PUT        /workshops/:workshop_id/bookings/:id.json                                    bookings#update
                                     DELETE     /workshops/:workshop_id/bookings/:id.json                                    bookings#destroy

  workshop_workshop_session_comments POST       /workshops/:workshop_id/workshop_sessions/:workshop_session_id/comments.json comments#create
   workshop_workshop_session_ratings POST       /workshops/:workshop_id/workshop_sessions/:workshop_session_id/ratings.json  ratings#create

          workshop_workshop_sessions GET        /workshops/:workshop_id/workshop_sessions.json                               workshop_sessions#index
                                     POST       /workshops/:workshop_id/workshop_sessions.json                               workshop_sessions#create
           workshop_workshop_session GET        /workshops/:workshop_id/workshop_sessions/:id.json                           workshop_sessions#show
                                     PATCH      /workshops/:workshop_id/workshop_sessions/:id.json                           workshop_sessions#update
                                     PUT        /workshops/:workshop_id/workshop_sessions/:id.json                           workshop_sessions#update
                                     DELETE     /workshops/:workshop_id/workshop_sessions/:id.json                           workshop_sessions#destroy

             workshop_participations GET        /workshops/:workshop_id/participations.json                                  participations#index
                                     POST       /workshops/:workshop_id/participations.json                                  participations#create
              workshop_participation GET        /workshops/:workshop_id/participations/:id.json                              participations#show
                                     PATCH      /workshops/:workshop_id/participations/:id.json                              participations#update
                                     PUT        /workshops/:workshop_id/participations/:id.json                              participations#update
                                     DELETE     /workshops/:workshop_id/participations/:id.json                              participations#destroy

                              venues GET        /venues.json                                                                 venues#index
                                     POST       /venues.json                                                                 venues#create


