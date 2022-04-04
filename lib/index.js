#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var lib_1 = require("@jcroall/synopsys-sig-node/lib/");
var lib_2 = require("@jcroall/synopsys-sig-node/lib");
var fs = __importStar(require("fs"));
var paths_1 = require("@jcroall/synopsys-sig-node/lib/paths");
var discussions_1 = require("@jcroall/synopsys-sig-node/lib/gitlab/discussions");
var chalk = require('chalk');
var figlet = require('figlet');
var program = require('commander');
var GITLAB_SECURITY_DASHBOARD_SAST_FILE = "synopsys-gitlab-sast.json";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var options, COVERITY_URL, COVERITY_PROJECT, COV_USER, COVERITY_PASSPHRASE, coverity_url, coverity_project_name, coverity_results_file, GITLAB_TOKEN, CI_SERVER_URL, CI_MERGE_REQUEST_IID, CI_MERGE_REQUEST_DIFF_BASE_SHA, CI_COMMIT_SHA, CI_PROJECT_NAMESPACE, CI_PROJECT_NAME, CI_PROJECT_ID, CI_COMMIT_BRANCH, is_merge_request, jsonV7Content, coverityIssues, mergeKeyToIssue, canCheckCoverity, allMergeKeys, allUniqueMergeKeys, error_1, gitlab_json, _i, _a, issue, projectIssue, cid_url, merge_request_iid, project, review_discussions, diff_map, _loop_1, _b, _c, issue, _loop_2, _d, review_discussions_1, discussion;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log(chalk.blue(figlet.textSync('coverity-gitlab', { horizontalLayout: 'full' })));
                    program
                        .description("Integrate Synopsys Coverity Static Analysis into GitLab")
                        .option('-j, --json <Coverity Results v7 JSON>', 'Location of the Coverity Results v7 JSON')
                        .option('-u, --coverity-url <Coverity URL>', 'Location of the Coverity server')
                        .option('-p, --coverity-project <Coverity Project Name>', 'Name of Coverity project')
                        .option('-g, --gitlab-security', 'Generate GitLab Security Dashboard output')
                        .option('-d, --debug', 'Enable debug mode (extra verbosity)')
                        .parse(process.argv);
                    options = program.opts();
                    lib_2.logger.info("Starting Coverity GitLab Integration");
                    COVERITY_URL = process.env['COVERITY_URL'];
                    COVERITY_PROJECT = process.env['COVERITY_PROJECT'];
                    COV_USER = process.env['COV_USER'];
                    COVERITY_PASSPHRASE = process.env['COVERITY_PASSPHRASE'];
                    coverity_url = options.coverityUrl ? options.coverityUrl : COVERITY_URL;
                    if (!coverity_url) {
                        lib_2.logger.error("Must specify Coverity URL in arguments or environment");
                        process.exit(1);
                    }
                    coverity_project_name = options.coverityProject ? options.coverityProject : COVERITY_PROJECT;
                    if (!coverity_project_name) {
                        lib_2.logger.error("Must specify Coverity Project in arguments or environment");
                        process.exit(1);
                    }
                    coverity_results_file = undefined === options.json
                        ? 'coverity-results.json'
                        : options.json || 'coverity-results.json';
                    lib_2.logger.info("Using JSON file path: ".concat(coverity_results_file));
                    if (!process.argv.slice(2).length) {
                        program.outputHelp();
                    }
                    if (options.debug) {
                        lib_2.logger.level = 'debug';
                        lib_2.logger.debug("Enabled debug mode");
                    }
                    GITLAB_TOKEN = process.env['GITLAB_TOKEN'];
                    CI_SERVER_URL = process.env['CI_SERVER_URL'];
                    CI_MERGE_REQUEST_IID = process.env['CI_MERGE_REQUEST_IID'] // MR Only
                    ;
                    CI_MERGE_REQUEST_DIFF_BASE_SHA = process.env['CI_MERGE_REQUEST_DIFF_BASE_SHA'] // MR Only
                    ;
                    CI_COMMIT_SHA = process.env['CI_COMMIT_SHA'];
                    CI_PROJECT_NAMESPACE = process.env['CI_PROJECT_NAMESPACE'];
                    CI_PROJECT_NAME = process.env['CI_PROJECT_NAME'];
                    CI_PROJECT_ID = process.env['CI_PROJECT_ID'];
                    CI_COMMIT_BRANCH = process.env['CI_COMMIT_BRANCH'] // Push only
                    ;
                    if (!GITLAB_TOKEN || !CI_SERVER_URL || !CI_PROJECT_NAMESPACE || !CI_PROJECT_NAME || !CI_PROJECT_ID || !CI_COMMIT_SHA) {
                        lib_2.logger.error("Must specify GITLAB_TOKEN, CI_SERVER_URL, CI_PROJECT_NAMESPACE, CI_PROJECT_ID, CI_COMMIT_SHA and CI_PROJECT_NAME.");
                        process.exit(1);
                    }
                    is_merge_request = !!CI_MERGE_REQUEST_IID;
                    if (!is_merge_request) {
                        if (!CI_COMMIT_BRANCH) {
                            lib_2.logger.error("Must specify CI_COMMIT_BRANCH.");
                            process.exit(1);
                        }
                    }
                    else {
                        if (!CI_MERGE_REQUEST_DIFF_BASE_SHA) {
                            lib_2.logger.error("Must specify CI_MERGE_REQUEST_DIFF_BASE_SHA when running from merge request.");
                            process.exit(1);
                        }
                    }
                    jsonV7Content = fs.readFileSync(coverity_results_file);
                    coverityIssues = JSON.parse(jsonV7Content.toString());
                    mergeKeyToIssue = new Map();
                    canCheckCoverity = coverity_url && COV_USER && COVERITY_PASSPHRASE && coverity_project_name;
                    if (!!canCheckCoverity) return [3 /*break*/, 1];
                    lib_2.logger.warn('Missing Coverity Connect info. Issues will not be checked against the server.');
                    return [3 /*break*/, 5];
                case 1:
                    allMergeKeys = coverityIssues.issues.map(function (issue) { return issue.mergeKey; });
                    allUniqueMergeKeys = new Set(allMergeKeys);
                    if (!(canCheckCoverity && coverityIssues && coverityIssues.issues.length > 0)) return [3 /*break*/, 5];
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, lib_1.coverityMapMatchingMergeKeys)(coverity_url, COV_USER, COVERITY_PASSPHRASE, coverity_project_name, allUniqueMergeKeys)];
                case 3:
                    mergeKeyToIssue = _e.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _e.sent();
                    lib_2.logger.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5:
                    if (options.gitlabSecurity) {
                        lib_2.logger.info("Generating GitLab Security Dashboard output: ".concat(GITLAB_SECURITY_DASHBOARD_SAST_FILE));
                        gitlab_json = gitlab_initialize_coverity_json();
                        for (_i = 0, _a = coverityIssues.issues; _i < _a.length; _i++) {
                            issue = _a[_i];
                            projectIssue = mergeKeyToIssue.get(issue.mergeKey);
                            cid_url = undefined;
                            if (projectIssue) {
                                cid_url = "".concat(COVERITY_URL, "/query/defects.htm?project=").concat(COVERITY_PROJECT, "&cid=").concat(projectIssue.cid);
                            }
                            else {
                                cid_url = '';
                            }
                            gitlab_json.vulnerabilities.push(gitlab_get_coverity_json_vulnerability(issue, cid_url));
                        }
                        fs.writeFileSync(GITLAB_SECURITY_DASHBOARD_SAST_FILE, JSON.stringify(gitlab_json, null, 2), 'utf8');
                    }
                    if (!is_merge_request) {
                        lib_2.logger.info('Not a Pull Request, nothing else to do.');
                        return [2 /*return*/];
                    }
                    merge_request_iid = parseInt(CI_MERGE_REQUEST_IID, 10);
                    lib_2.logger.info("Connecting to GitLab: ".concat(CI_SERVER_URL));
                    return [4 /*yield*/, (0, lib_1.gitlabGetProject)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID)];
                case 6:
                    project = _e.sent();
                    lib_2.logger.debug("Project=".concat(project.name));
                    return [4 /*yield*/, (0, lib_1.gitlabGetDiscussions)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid).
                            then(function (discussions) { return discussions.filter(function (discussion) { return discussion.notes[0].body.includes(lib_1.COVERITY_COMMENT_PREFACE); }); })];
                case 7:
                    review_discussions = _e.sent();
                    return [4 /*yield*/, (0, lib_1.gitlabGetDiffMap)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid)];
                case 8:
                    diff_map = _e.sent();
                    _loop_1 = function (issue) {
                        var projectIssue, ignoredOnServer, newOnServer, reviewCommentBody, path, file_link, issueCommentBody, review_discussion_index, existing_discussion, comment_index, existing_comment;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    lib_2.logger.info("Found Coverity Issue ".concat(issue.mergeKey, " at ").concat(issue.strippedMainEventFilePathname, ":").concat(issue.mainEventLineNumber));
                                    projectIssue = mergeKeyToIssue.get(issue.mergeKey);
                                    ignoredOnServer = false;
                                    newOnServer = true;
                                    if (projectIssue) {
                                        ignoredOnServer = projectIssue.action == 'Ignore' || projectIssue.classification in ['False Positive', 'Intentional'];
                                        newOnServer = projectIssue.firstSnapshotId == projectIssue.lastSnapshotId;
                                        lib_2.logger.info("Issue state on server: ignored=".concat(ignoredOnServer, ", new=").concat(newOnServer));
                                    }
                                    reviewCommentBody = (0, lib_1.coverityCreateReviewCommentMessage)(issue);
                                    path = issue.strippedMainEventFilePathname.startsWith('/') ?
                                        (0, paths_1.relatavize_path)(process.cwd(), issue.strippedMainEventFilePathname) :
                                        issue.strippedMainEventFilePathname;
                                    file_link = "".concat(CI_SERVER_URL, "/").concat(process.env.CI_PROJECT_NAMESPACE, "/").concat(process.env.CI_PROJECT_NAME, "/-/blob/").concat(process.env.CI_COMMIT_REF_NAME, "/").concat(path, "#L").concat(issue.mainEventLineNumber);
                                    issueCommentBody = (0, lib_1.coverityCreateIssueCommentMessage)(issue, file_link);
                                    review_discussion_index = review_discussions.findIndex(function (discussion) {
                                        var _a;
                                        return ((_a = discussion.notes[0].position) === null || _a === void 0 ? void 0 : _a.new_line) === issue.mainEventLineNumber &&
                                            discussion.notes[0].body.includes(issue.mergeKey);
                                    });
                                    existing_discussion = undefined;
                                    if (review_discussion_index !== -1) {
                                        existing_discussion = review_discussions.splice(review_discussion_index, 1)[0];
                                    }
                                    comment_index = review_discussions.findIndex(function (discussion) { return discussion.notes[0].body.includes(issue.mergeKey); });
                                    existing_comment = undefined;
                                    if (comment_index !== -1) {
                                        existing_comment = review_discussions.splice(comment_index, 1)[0];
                                    }
                                    if (!(existing_discussion !== undefined)) return [3 /*break*/, 3];
                                    lib_2.logger.info("Issue already reported in discussion #".concat(existing_discussion.id, " note #").concat(existing_discussion.notes[0].id, ", updating if necessary..."));
                                    if (!(existing_discussion.notes[0].body !== reviewCommentBody)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, lib_1.gitlabUpdateNote)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid, parseInt(existing_discussion.id, 10), existing_discussion.notes[0].id, reviewCommentBody).catch(function (error) {
                                            lib_2.logger.error("Unable to update discussion: ".concat(error.message));
                                        })];
                                case 1:
                                    _f.sent();
                                    _f.label = 2;
                                case 2: return [3 /*break*/, 12];
                                case 3:
                                    if (!(existing_comment !== undefined)) return [3 /*break*/, 6];
                                    lib_2.logger.info("Issue already reported in discussion #".concat(existing_comment.id, " note #").concat(existing_comment.notes[0].id, ", updating if necessary..."));
                                    if (!(existing_comment.notes[0].body !== issueCommentBody)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, (0, lib_1.gitlabUpdateNote)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid, parseInt(existing_comment.id, 10), existing_comment.notes[0].id, reviewCommentBody).catch(function (error) {
                                            lib_2.logger.error("Unable to update discussion: ".concat(error.message));
                                        })];
                                case 4:
                                    _f.sent();
                                    _f.label = 5;
                                case 5: return [3 /*break*/, 12];
                                case 6:
                                    if (!ignoredOnServer) return [3 /*break*/, 7];
                                    lib_2.logger.info('Issue ignored on server, no comment needed.');
                                    return [3 /*break*/, 12];
                                case 7:
                                    if (!!newOnServer) return [3 /*break*/, 8];
                                    lib_2.logger.info('Issue already existed on server, no comment needed.');
                                    return [3 /*break*/, 12];
                                case 8:
                                    if (!(0, lib_1.coverityIsInDiff)(issue, diff_map)) return [3 /*break*/, 10];
                                    lib_2.logger.info('Issue not reported, adding a comment to the review.');
                                    return [4 /*yield*/, (0, lib_1.gitlabCreateDiscussion)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid, issue.mainEventLineNumber, issue.strippedMainEventFilePathname, reviewCommentBody, CI_MERGE_REQUEST_DIFF_BASE_SHA ? CI_MERGE_REQUEST_DIFF_BASE_SHA : '', CI_COMMIT_SHA ? CI_COMMIT_SHA : '').catch(function (error) {
                                            lib_2.logger.error("Unable to create discussion: ".concat(error.message));
                                        })];
                                case 9:
                                    _f.sent();
                                    return [3 /*break*/, 12];
                                case 10:
                                    lib_2.logger.info('Issue not reported, adding an issue comment.');
                                    return [4 /*yield*/, (0, discussions_1.gitlabCreateDiscussionWithoutPosition)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid, issueCommentBody).catch(function (error) {
                                            lib_2.logger.error("Unable to create discussion: ".concat(error.message));
                                        })];
                                case 11:
                                    _f.sent();
                                    _f.label = 12;
                                case 12: return [2 /*return*/];
                            }
                        });
                    };
                    _b = 0, _c = coverityIssues.issues;
                    _e.label = 9;
                case 9:
                    if (!(_b < _c.length)) return [3 /*break*/, 12];
                    issue = _c[_b];
                    return [5 /*yield**/, _loop_1(issue)];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12:
                    _loop_2 = function (discussion) {
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    if (!(0, lib_1.coverityIsPresent)(discussion.notes[0].body)) return [3 /*break*/, 2];
                                    lib_2.logger.info("Discussion #".concat(discussion.id, " Note #").concat(discussion.notes[0].id, " represents a Coverity issue which is no longer present, updating comment to reflect resolution."));
                                    return [4 /*yield*/, (0, lib_1.gitlabUpdateNote)(CI_SERVER_URL, GITLAB_TOKEN, CI_PROJECT_ID, merge_request_iid, parseInt(discussion.id, 10), discussion.notes[0].id, (0, lib_1.coverityCreateNoLongerPresentMessage)(discussion.notes[0].body)).catch(function (error) {
                                            lib_2.logger.error("Unable to update note #".concat(discussion.notes[0].id, ": ").concat(error.message));
                                        })];
                                case 1:
                                    _g.sent();
                                    _g.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _d = 0, review_discussions_1 = review_discussions;
                    _e.label = 13;
                case 13:
                    if (!(_d < review_discussions_1.length)) return [3 /*break*/, 16];
                    discussion = review_discussions_1[_d];
                    return [5 /*yield**/, _loop_2(discussion)];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15:
                    _d++;
                    return [3 /*break*/, 13];
                case 16:
                    lib_2.logger.info("Found ".concat(coverityIssues.issues.length, " Coverity issues."));
                    if (coverityIssues.issues.length > 0) {
                        process.exit(1);
                    }
                    else {
                        process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
function gitlab_get_coverity_json_vulnerability(issue, cid_url) {
    var _a, _b, _c, _d, _e;
    var json_vlun = {
        id: issue.mergeKey,
        cve: issue.mergeKey,
        category: "sast",
        name: (_a = issue.checkerProperties) === null || _a === void 0 ? void 0 : _a.subcategoryShortDescription,
        message: (_b = issue.checkerProperties) === null || _b === void 0 ? void 0 : _b.subcategoryShortDescription,
        description: (_c = issue.checkerProperties) === null || _c === void 0 ? void 0 : _c.subcategoryLongDescription,
        severity: (_d = issue.checkerProperties) === null || _d === void 0 ? void 0 : _d.impact,
        confidence: "High",
        scanner: {
            id: "synopsys_coverity",
            name: "Synopsys Coverity"
        },
        location: {
            file: issue.strippedMainEventFilePathname,
            start_line: issue.mainEventLineNumber,
            end_line: issue.mainEventLineNumber,
            class: issue.functionDisplayName ? issue.functionDisplayName : "",
            method: issue.functionDisplayName ? issue.functionDisplayName : ""
        },
        identifiers: [
            {
                type: "synopsys_coverity_type",
                name: "Coverity ".concat(issue.checkerName),
                value: issue.checkerName,
                url: (cid_url && cid_url.length > 0) ? cid_url : "http://url-not-available-for-this-issue"
            }
        ]
    };
    if (cid_url && cid_url.length > 0) {
        json_vlun.identifiers[0].url = cid_url;
    }
    if (((_e = issue.checkerProperties) === null || _e === void 0 ? void 0 : _e.cweCategory) && issue.checkerProperties.cweCategory != "none") {
        var cwe_identifer = {
            type: "cwe",
            name: "CWE-".concat(issue.checkerProperties.cweCategory),
            value: issue.checkerProperties.cweCategory,
            url: "https://cwe.mitre.org/data/definitions/".concat(issue.checkerProperties.cweCategory, ".html")
        };
        json_vlun.identifiers.push(cwe_identifer);
    }
    return (json_vlun);
}
function gitlab_initialize_coverity_json() {
    return {
        version: '2.0',
        vulnerabilities: []
    };
}
main();
