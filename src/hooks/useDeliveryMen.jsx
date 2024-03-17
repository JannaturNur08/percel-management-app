import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeliveryMen = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isDeliveryMen , isPending : isDeliveryMenLoading } = useQuery({
        queryKey : [ user?.email, 'isDeliveryMen'],
        enabled: !loading && !!localStorage.getItem('token'),
        queryFn: async ()=> {
            const res = await axiosSecure.get(`/users/deliveryMen/${user.email}`);
            console.log(res.data);
            return res.data?.deliveryMen;
        } // we can't use user
    })
    return [isDeliveryMen, isDeliveryMenLoading];
};

export default useDeliveryMen;