package com.ssafy.articleservice.api.service.article;

import com.ssafy.articleservice.api.controller.article.response.ArticleDetailResponse;
import com.ssafy.articleservice.api.controller.article.response.ArticleResponse;
import com.ssafy.articleservice.domain.article.Article;
import com.ssafy.articleservice.domain.article.ArticleImage;
import com.ssafy.articleservice.domain.article.repository.ArticleImageRepository;
import com.ssafy.articleservice.domain.article.repository.ArticleQueryRepository;
import com.ssafy.articleservice.domain.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ArticleQueryService {

    private final ArticleRepository articleRepository;
    private final ArticleImageRepository articleImageRepository;
    private final ArticleQueryRepository articleQueryRepository;

    public Page<ArticleResponse> getArticles() {
        return null;
    }

    public ArticleDetailResponse getArticle(Long articleId) {
        Article findArticle = getArticleEntity(articleId);
        List<ArticleImage> findArticleImages = articleImageRepository.findByArticleId(articleId);
        return ArticleDetailResponse.of(findArticle, findArticleImages);
    }

    private Article getArticleEntity(Long articleId) {
        Optional<Article> findArticle = articleRepository.findById(articleId);
        if (findArticle.isEmpty()) {
            throw new NoSuchElementException("존재하지 않는 기사입니다.");
        }
        return findArticle.get();
    }
}
