<template>
  <!-- //*this is not a page yet// -->
  <div class="columns">
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img
              src="https://bulma.io/images/placeholders/128x128.png"
              alt="Image"
            />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small>
              <small>31m</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              efficitur sit amet massa fringilla egestas. Nullam condimentum
              luctus turpis.
            </p>
          </div>
          <!-- //?Like  section -->
          <nav class="level is-mobile align-items: center">
            <div class="level-left">
              <a class="level-item" aria-label="reply">
                <span class="icon is-small">
                  <i class="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="retweet">
                <span class="icon is-small">
                  <i class="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like">
                <span class="icon is-small">
                  <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
          <!-- //?End of Like section -->

          <!-- //?comment section -->

          <div class="box">// ...</div>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-small" placeholder="Tweet your reply..." />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>

          <!-- //?End of comment section -->
        </div>
      </article>
    </div>
  </div>
</template>
