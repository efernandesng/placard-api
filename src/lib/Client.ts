import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://www.jogossantacasa.pt/';
const API_KEY = '552CF226909890A044483CECF8196792';
const USER_AGENT = 'NodeJs Placard Client/1.0';

interface IEventPath {
  eventPathId: number;
  eventPathDescription: string;
  parentId: number;
}
type EventPaths = IEventPath[];

interface IOutcome {
  index: number;
  outcomeId: number;
  outcomeDescription: string;
  handicapValue: number;
  hidden: boolean;
  suspended: boolean;
  price: {
    decimalPrice: number;
  };
}
type Outcomes = IOutcome[];

interface IMarket {
  index: number;
  marketId: number;
  marketDescription: string;
  marketStatus: string;
  periodDescription: string;
  retailSalesCloseDateTime: string;
  promotionLevel: string;
  outcomes: Outcomes;
  eventIndex: number;
}
type Markets = IMarket[];

interface IEventsResponse {
  status: string;
  programmeOpenDateTime: string;
  programmeCloseDateTime: string;
  exportedProgrammeEntries: [
    {
      index: number;
      eventPaths: EventPaths;
      eventStartDateTime: string;
      homeOpponentId: number;
      homeOpponentDescription: string;
      awayOpponentId: number;
      awayOpponentDescription: string;
      fictional: boolean;
      markets: Markets;
      sportCode: string;
    },
  ];
}

interface IInfoItem {
  contentId: number;
  title: string;
  subTitle?: string;
  resume: string;
  description: string;
  contentDate: string;
}
type IInfoResponse = IInfoItem[];

class Client {
  private apiKey: string;
  private userAgent: string | null;

  constructor(apiKey = API_KEY, userAgent = USER_AGENT) {
    this.apiKey = apiKey;
    this.userAgent = userAgent;
  }

  public fullSportsBook(): Promise<IEventsResponse> {
    return this.request('/WebServices/SBRetailWS/FullSportsBook');
  }

  public nextEvents(): Promise<IEventsResponse> {
    return this.request('/WebServices/SBRetailWS/NextEvents');
  }

  public info(): Promise<IInfoResponse> {
    return this.request('/WebServices/ContentWS/Contents/', {
      categoryCode: 'ADRETAILINFOS',
    });
  }

  public faq(): Promise<IInfoResponse> {
    return this.request('/WebServices/ContentWS/Contents/', {
      categoryCode: 'ADRETAILFAQSAPP',
    });
  }
  private async request(endpoint: string, query?: object): Promise<any> {
    const fNow = moment().format('ddd, D MMM YYYY HH:mm:ss [GMT]Z');
    try {
      const res = await axios.get(endpoint, {
        baseURL: BASE_URL,
        headers: {
          'If-Modified-Since': fNow,
        },
        params: { apiKey: this.apiKey, channel: 1, ...query },
      });

      return res.data.body.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Client;
