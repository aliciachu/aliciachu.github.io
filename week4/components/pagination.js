export default {
    props: ['pages', 'getProduct'],
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" @click="getProduct(pages.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li v-for="page in pages.total_pages" :key="'page'+page" class="page-item"
            :class="{active:page===pages.current_page}">
            <a class="page-link" href="#" @click="getProduct(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{disabled: !pages.has_next}">
            <a class="page-link" href="#" aria-label="Next" @click="getProduct(pages.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`,
}