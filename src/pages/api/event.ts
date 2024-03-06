import { sha256 } from "js-sha256";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

interface IFacebookApiRequest extends NextApiRequest {
  body: {
    // Server Event Parameters 
    event_id: string;               //[1]
    event_name: string;             //[2]
    event_source_url: string;       //[3]
    // Customer Information Parameters 
    // email: string;                  //{1}
    // phone_number: string;           //{2}
    // first_name: string;             //{3}
    // last_name: string;              //{4}
    // gender: string;                 //{5}
    // birthday: string;               //{6}
    // city: string;                   //{7}
    // state: string;                  //{8}
    // zip_code: string;               //{9}
    // country: string;                //{10}
    external_id: string;            //{11} | *This is userID
    // client_ip_address: string;      //{12}
    client_user_agent: string;      //{13}
    fbc: string;                    //{14}
    fbp: string;                    //{15}
    // subscription_id: string;        //{16}
    // fb_login_id: string;            //{17}
    // Main Body Parameters 
    test_event_code: string | null; //(1) | *Get test code from Events manager
  };
}

export default async function Handler(
  req: IFacebookApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    return res.send("yeee boy");
  }
  if (req.method === "POST") {
    console.log(req.body);
    try {
      // const cookies = req.cookies;
      // let user_location: user_locationType | null = null;
      // if (cookies["user_location"]) {
      //   user_location = JSON.parse(cookies["user_location"]);
      // }
      const testData = {
        data: [
          {
            action_source: "website",
            event_id: req.body.event_id,
            event_name: req.body.event_name,
            event_time: Math.floor(new Date().getTime() / 1000),
            event_source_url: req.body.event_source_url,
            user_data: {
              // em: sha256(req.body.email),                    //{1}
              // ph: sha256(req.body.phone_number),             //{2}
              // fn: sha256(req.body.first_name),               //{3}
              // ln: sha256(req.body.last_name),                //{4}
              // ge: sha256(req.body.gender),                   //{5}
              // db: sha256(req.body.birthday),                 //{6}
              // ct: sha256(req.body.city),                     //{7}
              // st: sha256(req.body.state),                    //{8}
              // zp: sha256(req.body.zip_code),                 //{9}
              // country: sha256(req.body.country),             //{10}
              external_id: req.body.external_id,             //{11}
              // client_ip_address: req.body.client_ip_address, //{12}
              client_user_agent: req.body.client_user_agent, //{13}
              fbp: req.body.fbp,                             //{14}
              fbc: req.body.fbc,                             //{15}
              // subscription_id: req.body.subscription_id,     //{16}
              // fb_login_id: req.body.fb_login_id              //{17}
            },
          },
        ],
        // test_event_code: req.body.isTest ? "TEST46387" : null,
        test_event_code: req.body.test_event_code ? req.body.test_event_code : null,
      };
      const fbGraphAPIVersion = "v19.0";
      // const fbPixelId = 759662146057719;
      const fbPixelId = 1891668641304082;
      // const accessToken =
      //   "EAAwkitiYFnYBO3zGv5zDnt8UomufZAKEeycEL3ZCfz1lPISHP0qJAdsptvJHGQ3mmtZALOXLp2UzNfAjxMotXrSArBUZARm6KC8qgHKTJZAwD5ovjjGr1W3zsjyTBihkoX8yefdoQ2okVLsLBKviuRHZAtM6654ZAZC5ypv2lFp1a6aKcOJRndqRkZANT4UsWxC6nawZDZD";
      const accessToken =
      "EAAwkitiYFnYBO5CNZBAonD7qxLaLT3ZBLpud3QZCawl7auAtCFGZAOr5nzS7Iomw10OmsQYzHkyKpxiBzuq5rx0YxCSZBrZCX8LtaMtXGfXd7MIe7oarQP4AYxr3l45mVhc4fbR38SRy8EOHkKIO2HJNMZCkKekY9hTEMMt7QA2TgWzzkHPuEZBK3rQZBOkzsYmH8TAZDZD";
      const response = await fetch(
        `https://graph.facebook.com/${fbGraphAPIVersion}/${fbPixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testData),
        }
      );
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  } else res.status(404);
}
