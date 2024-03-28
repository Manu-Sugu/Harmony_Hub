"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: "home", displayName: '' });
});
router.get('/blog', function (req, res, next) {
    res.render('index', { title: 'Blog', page: "blog", displayName: '' });
});
router.get('/career', function (req, res, next) {
    res.render('index', { title: 'Careers', page: "career", displayName: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: 'Contact Us', page: "contact", displayName: '' });
});
router.get('/contact-list', function (req, res, next) {
    res.render('index', { title: 'Contact List', page: "contact-list", displayName: '' });
});
router.get('/events', function (req, res, next) {
    res.render('index', { title: 'Our Events', page: "events", displayName: '' });
});
router.get('/gallery', function (req, res, next) {
    res.render('index', { title: 'Our Gallery', page: "gallery", displayName: '' });
});
router.get('/portfolio', function (req, res, next) {
    res.render('index', { title: 'Our Portfolio', page: "portfolio", displayName: '' });
});
router.get('/privacypolicy', function (req, res, next) {
    res.render('index', { title: 'Privacy Policy', page: "privacypolicy", displayName: '' });
});
router.get('/statistics', function (req, res, next) {
    res.render('index', { title: 'Our Statistics', page: "statistics", displayName: '' });
});
router.get('/service', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: "service", displayName: '' });
});
router.get('/team', function (req, res, next) {
    res.render('index', { title: 'Our Team', page: "team", displayName: '' });
});
router.get('/tos', function (req, res, next) {
    res.render('index', { title: 'Terms of Services', page: "tos", displayName: '' });
});
router.get('/register', function (req, res, next) {
    res.render('index', { title: 'Register', page: "register", displayName: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: "login", displayName: '' });
});
router.get('/edit', function (req, res, next) {
    res.render('index', { title: 'Edit', page: "edit", displayName: '' });
});
router.get('/event-planning', function (req, res, next) {
    res.render('index', { title: 'Event Planning', page: "event-planning", displayName: '' });
});
exports.default = router;
//# sourceMappingURL=index.js.map