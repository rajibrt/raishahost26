{assign var=rhSite value="https://raishahost.com"}
                    </div>

                    </div>
                    {if $templatefile != 'homepage' && !$inShoppingCart && $secondarySidebar->hasChildren()}
                        <div class="d-lg-none sidebar sidebar-secondary">
                            {include file="$template/includes/sidebar.tpl" sidebar=$secondarySidebar}
                        </div>
                    {/if}
                <div class="clearfix"></div>
            </div>
        </div>
    </section>

    <footer id="footer" class="rh-footer">
        <div class="container">
            <div class="rh-fgrid">
                <div class="rh-fbrand">
                    <img src="{$WEB_ROOT}/templates/raishahost/img/raishahost-logo-on-dark.svg" alt="RaishaHost" width="170" height="22" loading="lazy">
                    <p>Web hosting, servers, domains and design for clients around the world. Based in Bangladesh, in business since 2008.</p>
                    <p>
                        <a href="tel:+8801711380679">+880 1711-380679</a><br>
                        <a href="https://facebook.com/RaishaHost" target="_blank" rel="noopener">facebook.com/RaishaHost</a>
                    </p>
                </div>
                <div>
                    <h4>Order</h4>
                    <ul>
                        <li><a href="{$WEB_ROOT}/store/linux-shared-hosting">cPanel Hosting</a></li>
                        <li><a href="{$WEB_ROOT}/store/vps">VPS Servers</a></li>
                        <li><a href="{$WEB_ROOT}/cart.php?a=add&domain=register">Register a Domain</a></li>
                        <li><a href="{$WEB_ROOT}/cart.php?a=add&domain=transfer">Transfer a Domain</a></li>
                        <li><a href="{routePath('domain-pricing')}">Domain Prices</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Your Account</h4>
                    <ul>
                        {if $loggedin}
                            <li><a href="{$WEB_ROOT}/clientarea.php">Dashboard</a></li>
                            <li><a href="{$WEB_ROOT}/clientarea.php?action=services">My Services</a></li>
                            <li><a href="{$WEB_ROOT}/clientarea.php?action=invoices">Invoices</a></li>
                        {else}
                            <li><a href="{$WEB_ROOT}/login.php">Log In</a></li>
                            <li><a href="{$WEB_ROOT}/register.php">Create Account</a></li>
                            <li><a href="{$WEB_ROOT}/password/reset">Forgot Password</a></li>
                        {/if}
                        <li><a href="{$WEB_ROOT}/supporttickets.php">Support Tickets</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Help</h4>
                    <ul>
                        <li><a href="{$WEB_ROOT}/submitticket.php">Open a Ticket</a></li>
                        <li><a href="{routePath('knowledgebase-index')}">Knowledge Base</a></li>
                        <li><a href="{$WEB_ROOT}/serverstatus.php">Network Status</a></li>
                        <li><a href="{$WEB_ROOT}/contact.php">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Policies</h4>
                    <ul>
                        <li><a href="{$rhSite}/money-back">Money-Back Guarantee</a></li>
                        <li><a href="{$rhSite}/guarantees">Our Promises</a></li>
                        <li><a href="{$rhSite}/terms-conditions">Terms &amp; Conditions</a></li>
                        <li><a href="{$rhSite}/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="rh-legal">
                <span>&copy; {$date_year} RaishaHost. All rights reserved.</span>
                <span class="rh-legal-r">
                    <span>cPanel hosting is billed yearly, VPS monthly.</span>
                    {if $languagechangeenabled && count($locales) > 1 || $currencies}
                        <button type="button" class="rh-locale" data-toggle="modal" data-target="#modalChooseLanguage">
                            <i class="far fa-globe"></i>
                            {if $languagechangeenabled && count($locales) > 1}{$activeLocale.localisedName} / {/if}{$activeCurrency.code}
                        </button>
                    {/if}
                </span>
            </div>
        </div>
    </footer>

    <div id="fullpage-overlay" class="w-hidden">
        <div class="outer-wrapper">
            <div class="inner-wrapper">
                <img src="{$WEB_ROOT}/assets/img/overlay-spinner.svg" alt="">
                <br>
                <span class="msg"></span>
            </div>
        </div>
    </div>

    <div class="modal system-modal fade" id="modalAjax" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">{lang key='close'}</span>
                    </button>
                </div>
                <div class="modal-body">
                    {lang key='loading'}
                </div>
                <div class="modal-footer">
                    <div class="float-left loader">
                        <i class="fas fa-circle-notch fa-spin"></i>
                        {lang key='loading'}
                    </div>
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        {lang key='close'}
                    </button>
                    <button type="button" class="btn btn-primary modal-submit">
                        {lang key='submit'}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <form method="get" action="{$currentpagelinkback}">
        <div class="modal modal-localisation" id="modalChooseLanguage" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        {if $languagechangeenabled && count($locales) > 1}
                            <h5 class="h5 pt-5 pb-3">{lang key='chooselanguage'}</h5>
                            <div class="row item-selector">
                                <input type="hidden" name="language" data-current="{$language}" value="{$language}" />
                                {foreach $locales as $locale}
                                    <div class="col-4">
                                        <a href="#" class="item{if $language == $locale.language} active{/if}" data-value="{$locale.language}">
                                            {$locale.localisedName}
                                        </a>
                                    </div>
                                {/foreach}
                            </div>
                        {/if}
                        {if !$loggedin && $currencies}
                            <p class="h5 pt-5 pb-3">{lang key='choosecurrency'}</p>
                            <div class="row item-selector">
                                <input type="hidden" name="currency" data-current="{$activeCurrency.id}" value="">
                                {foreach $currencies as $selectCurrency}
                                    <div class="col-4">
                                        <a href="#" class="item{if $activeCurrency.id == $selectCurrency.id} active{/if}" data-value="{$selectCurrency.id}">
                                            {$selectCurrency.prefix} {$selectCurrency.code}
                                        </a>
                                    </div>
                                {/foreach}
                            </div>
                        {/if}
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default">{lang key='apply'}</button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    {if !$loggedin && $adminLoggedIn}
        <a href="{$WEB_ROOT}/logout.php?returntoadmin=1" class="btn btn-return-to-admin" data-toggle="tooltip" data-placement="bottom" title="{if $adminMasqueradingAsClient}{lang key='adminmasqueradingasclient'} {lang key='logoutandreturntoadminarea'}{else}{lang key='adminloggedin'} {lang key='returntoadminarea'}{/if}">
            <i class="fas fa-redo-alt"></i>
            <span class="d-none d-md-inline-block">{lang key="admin.returnToAdmin"}</span>
        </a>
    {/if}

    {include file="$template/includes/generate-password.tpl"}

    <script src="{$WEB_ROOT}/templates/raishahost/js/rh.js?v={$versionHash}-rh71bd0d81" defer></script>

    {$footeroutput}

</body>
</html>
