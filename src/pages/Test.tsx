import useAxios from 'axios-hooks';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { ENDPOINT } from '../@utils/config/pokeapi';
import useIntersectionObserver from '../@utils/useIntersectionObserver';
const Test: React.FC = () => {
    const [offset, setOffset] = useState<number>(0)
    const [, execute] = useAxios({
        url: `${ENDPOINT}/pokemon/`,
        method: 'GET',
        params: {
            limit: 40,
            offset: 40
        }
    }, {
        manual: true
    });

    const {
        status,
        data,
        isFetching,
        isFetchingMore,
        fetchMore,
        canFetchMore,
      } = useInfiniteQuery('pokeDatas', () => {return execute({
        params: {
            limit: 40,
            offset: offset
        }
      })}, {
        getFetchMore: (lastGroup, allGroups) => {
            return (lastGroup as any).data.next;
        }
      });
    const mountRef = useRef(true);
    const loadMoreButtonRef = React.useRef(null)

    useIntersectionObserver({
        target: loadMoreButtonRef,
        onIntersect: fetchMore,
        enabled: canFetchMore,
    })
    useEffect(() => {
        // console.log(isFetching);
        mountRef.current = true;

        if(mountRef.current) {
            if(status === 'success') {
                // console.log('status = ', status);
                setOffset(prev => prev + 40)
            }
        }
        
        return () => {
            mountRef.current = false;
        }
    }, [status])


    return (
        <>
            <div>In Test Page</div>
            <>
                {
                    data?.map((group, i) => {
                        return <Fragment key={i}>
                            {
                                group.data.results.map((item: any, key: number) => (
                                    <p key={key}>{i} : name: {item.name} url: {item.url}</p>
                                ))
                            }
                        </Fragment>
                    })
                }
            </>
            <div
              ref={loadMoreButtonRef}   
            >
              {isFetchingMore
                ? 'Loading more...'
                : canFetchMore
                ? 'Load More'
                : 'Nothing more to load'}
            </div>
            <div>{isFetching && !isFetchingMore ? 'Fetching...' : null}</div>
        </>
    )
}

export default Test;