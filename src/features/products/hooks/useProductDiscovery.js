import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../shared/hooks/useDebounce'
import {
  DEFAULT_PRODUCT_DISCOVERY_FILTERS,
  createProductDiscoverySearchParams,
  filterAndSortProducts,
  parseProductDiscoveryFilters,
  hasActiveProductDiscoveryFilters,
} from '../services/productDiscoveryService'

const arraysEqual = (a = [], b = []) =>
  a.length === b.length && a.every((value, index) => value === b[index])

const rangesEqual = (a = [], b = []) => a[0] === b[0] && a[1] === b[1]

export function useProductDiscovery(products) {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlState = useMemo(
    () => parseProductDiscoveryFilters(searchParams),
    [searchParams.toString()]
  )

  const [search, setSearch] = useState(urlState.search)
  const [selectedCategories, setSelectedCategories] = useState(urlState.selectedCategories)
  const [priceRange, setPriceRange] = useState(urlState.priceRange)
  const [minRating, setMinRating] = useState(urlState.minRating)
  const [inStockOnly, setInStockOnly] = useState(urlState.inStockOnly)
  const [sort, setSort] = useState(urlState.sort)

  useEffect(() => {
    if (search !== urlState.search) setSearch(urlState.search)
    if (!arraysEqual(selectedCategories, urlState.selectedCategories)) setSelectedCategories(urlState.selectedCategories)
    if (!rangesEqual(priceRange, urlState.priceRange)) setPriceRange(urlState.priceRange)
    if (minRating !== urlState.minRating) setMinRating(urlState.minRating)
    if (inStockOnly !== urlState.inStockOnly) setInStockOnly(urlState.inStockOnly)
    if (sort !== urlState.sort) setSort(urlState.sort)
  }, [urlState])

  const debouncedSearch = useDebounce(search, 350)

  const appliedFilters = useMemo(() => ({
    search: search.trim() === '' ? '' : debouncedSearch,
    selectedCategories,
    priceRange,
    minRating,
    inStockOnly,
    sort,
  }), [search, debouncedSearch, selectedCategories, priceRange, minRating, inStockOnly, sort])

  useEffect(() => {
    const nextParams = createProductDiscoverySearchParams({
      search,
      selectedCategories,
      priceRange,
      minRating,
      inStockOnly,
      sort,
    })
    if (searchParams.toString() !== nextParams.toString()) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [search, selectedCategories, priceRange, minRating, inStockOnly, sort, searchParams, setSearchParams])

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, appliedFilters),
    [products, appliedFilters]
  )

  const resetFilters = useCallback(() => {
    setSearch(DEFAULT_PRODUCT_DISCOVERY_FILTERS.search)
    setSelectedCategories(DEFAULT_PRODUCT_DISCOVERY_FILTERS.selectedCategories)
    setPriceRange(DEFAULT_PRODUCT_DISCOVERY_FILTERS.priceRange)
    setMinRating(DEFAULT_PRODUCT_DISCOVERY_FILTERS.minRating)
    setInStockOnly(DEFAULT_PRODUCT_DISCOVERY_FILTERS.inStockOnly)
    setSort(DEFAULT_PRODUCT_DISCOVERY_FILTERS.sort)
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  return {
    search,
    setSearch,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    sort,
    setSort,
    filteredProducts,
    hasFilters: hasActiveProductDiscoveryFilters(appliedFilters),
    resetFilters,
  }
}
