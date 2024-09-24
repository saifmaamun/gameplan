import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { FacilityRoutes } from '../modules/Facility/facility.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { PaymentRoutes } from '../modules/Payment/payment.router';
// import { AvailabilityRoutes } from '../modules/Availibility/availibility.route';

const router = Router();

const moduleRoutes = [
  // facility routes
  {
    path: '/facility',
    route: FacilityRoutes,
  },
  // bookings routes
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  // payment routes
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  // authentication routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
