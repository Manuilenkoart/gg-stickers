import { redirect } from 'next/navigation';

import ROUTE_PATH from '../../lib/ROUTE_PATH';

export default function Page() {
  redirect(ROUTE_PATH.HOME);
}
