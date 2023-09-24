package com.ssafy.keywordservice.domain.keywordsearch.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.keywordservice.api.controller.popularkeyword.response.PopularKeywordResponse;
import com.ssafy.keywordservice.domain.keyword.QKeyword;
import com.ssafy.keywordservice.domain.keywordsearch.QKeywordSearch;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;

import static com.ssafy.keywordservice.domain.keyword.QKeyword.keyword;
import static com.ssafy.keywordservice.domain.keywordsearch.QKeywordSearch.*;

@Repository
public class KeywordSearchQueryRepository {

    private final JPAQueryFactory queryFactory;

    public KeywordSearchQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public List<PopularKeywordResponse> findTop10() {
        return queryFactory
            .select(Projections.constructor(PopularKeywordResponse.class,
                keywordSearch.keyword.id,
                keywordSearch.keyword.word,
                keywordSearch.count.sum().as("totalCount")
            ))
            .from(keywordSearch)
            .join(keywordSearch.keyword, keyword)
            .groupBy(keywordSearch.keyword.word)
            .orderBy(keywordSearch.count.sum().desc())
            .limit(10)
            .fetch();
    }
}
