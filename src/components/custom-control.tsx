import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CharacterSchema, CustomControlProps } from "../utils/type";
import { RiseLoader } from "react-spinners";
import { InnerComponent } from "./inner-component";
/* 
const CHARACTER_QUERY = gql`
    query Characters($name: String!) {
        characters(page: 1, filter: {name: $name}) {
            results {
                id
                name
                image
                episode {
                    id,
                    name
                }
            }
        }
    }
`; */

export const CustomControl = ({ search, selected, handleSelected, hidden }: CustomControlProps) => {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [results, setResults] = useState<CharacterSchema[]>([]);

    const fetchData = async () => {
        let result = await fetch('https://rickandmortyapi.com/graphql', {
            method: 'POST',

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                query: `{
              characters(page: 1, filter: {name: "${search}"}) {
                results {
                    id
                    name
                    image
                    episode {
                        id,
                        name
                    }
                }
              }
            }`
            })
        })
        let characters = await result.json();
        if (characters.data.characters.results.length < 20) {
            setHasMore(false);
        }
        if (result.status === 200) {
            setResults(characters.data.characters.results.map((characters: CharacterSchema) => {
                return {
                    ...characters,
                    checked: selected.find((c: CharacterSchema) => c.id === characters.id) ? true : false,
                };
            }));
        } else {
            return (
                <p>A problem occured while fetching data...</p>
            )
        }
    }

    useEffect(() => {
        setResults([]);
        setPage(1);
        setHasMore(true);
        fetchData();
    }, [search]);

    const fetchMoreData = async () => {
        setPage(page + 1);

        let result = await fetch('https://rickandmortyapi.com/graphql', {
            method: 'POST',

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                query: `{
              characters(page: ${page + 1}, filter: {name: "${search}"}) {
                results {
                    id
                    name
                    image
                    episode {
                        id,
                        name
                    }
                }
              }
            }`
            })
        })
        let characters = await result.json();
        if (result.status === 200) {
            if (characters.data.characters.results.length === 0) {
                setHasMore(false);
            } else {
                setResults(results => [...results, ...characters.data.characters.results.map((characters: CharacterSchema) => {
                    return {
                        ...characters,
                        checked: false,
                    };
                })]);
            }
        }
    }

    /* const { data, loading, error } = useQuery(CHARACTER_QUERY, {
        variables: { page: page, name: search }
    });

    
    if (loading) return <div>Loading....</div>;
    if (error) return <pre>{error.message}</pre> */

    const refresh = () => {
        setResults([]);
        setPage(1);
        setHasMore(true);
        fetchData();
    }

    return (
        <div hidden={hidden}>
            <div
                id="scrollableDiv"
                style={{
                    height: 300,
                    width: 350,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 8,
                    border: '#97ce4c dashed 1px',
                    borderRadius: 8
                }}
            >
                <InfiniteScroll
                    dataLength={results.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: 300}}><RiseLoader color="#97ce4c" /></div>}
                    endMessage={
                        <p style={{ textAlign: 'center', padding: 10 }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    refreshFunction={refresh}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    scrollableTarget="scrollableDiv"
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                >
                    <InnerComponent results={results} setResults={() => setResults} search={search} handleSelected={handleSelected} ></InnerComponent>
                </InfiniteScroll>
            </div>
        </div >
    );
};