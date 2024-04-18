import { useChannelsQuery } from "graphql/generated/graphql";

const useClientFormQueries = () => {
    const {
        data: channelsData,
        error: channelsError,
        loading: channelsLoading,
    } = useChannelsQuery();

    return {
        channelsData,
        channelsError,
        channelsLoading,
    };
};

export default useClientFormQueries;
