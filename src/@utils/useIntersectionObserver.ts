import { AxiosResponse } from 'axios'
import React from 'react'
import { FetchMoreOptions } from 'react-query/types/core/query'

interface intersectionProps {
  root?: React.MutableRefObject<Element>,
  target: React.MutableRefObject<undefined | Element | null>,
  onIntersect: (fetchMoreVariable?: unknown, options?: FetchMoreOptions | undefined) => Promise<AxiosResponse<any>[] | undefined>;
  threshold?: number,
  rootMargin?: string,
  enabled: boolean | undefined,
}

export default function useIntersectionObserver(props: intersectionProps) {
  React.useEffect(() => {
    if (!props.enabled) {
      return
    }

    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          entry.isIntersecting && props.onIntersect() 
        }),
      {
        root: props.root && props.root.current,
        rootMargin: props.rootMargin,
        threshold: props.threshold,
      }
    )

    const el = props.target && props.target.current

    if (!el) {
      return
    }
    observer.observe(el)  
    
    return () => {
      observer.unobserve(el)
    }
  }, [props.enabled, props])
}